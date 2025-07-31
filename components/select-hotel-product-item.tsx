'use client';

import Image from 'next/image';
import {
  // Camera,
  Utensils,
  CreditCard,
  ArrowUpCircle,
  Clock
} from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';

const getValidDate = (date: Date | string) => {
  const _date = new Date(date);
  if (isNaN(_date.valueOf())) {
    throw new Error('Invalid Date');
  }
  return _date;
};

const destructDate = (date: Date | string) => {
  try {
    const _date = getValidDate(date);
    return [
      _date.getFullYear(),
      _date.getMonth(),
      _date.getDate(),
      _date.getHours(),
      _date.getMinutes(),
      _date.getSeconds(),
      _date.getMilliseconds(),
    ];
  } catch (err) {
    throw new Error('cannot destruct Date');
  }
};

const formatParamDate = (date: Date | string) => {
  try {
    const _date = getValidDate(date);

    const [year, M, d] = destructDate(_date);
    const _M = M + 1;
    const month = _M < 10 ? `0${_M}` : `${_M}`;
    const day = d < 10 ? `0${d}` : `${d}`;
    return `${year}-${month}-${day}`;
  } catch (err) {
    throw new Error('cannot format Date');
  }
};

const genSabreApiEp = ({
  sabreId,
  checkIn,
  nights=1,
  numOfPeople='2',
}: {
  sabreId: number;
  checkIn: string | Date;
  nights?: number;
  numOfPeople?: string;
}) => {
  try {
    const _checkIn = formatParamDate(checkIn);
    return `${process.env.NEXT_PUBLIC_SABRE_API_BASE}/${sabreId}/select-rooms-price/?check_in=${_checkIn}&nights=${nights}&number_of_people=${numOfPeople}`;
  } catch (err) {
    throw new Error('cannot generate Sabre API Endpoint. Invalid checkIn value is given.');
  }
};

type Benefit = {
  icon: string | ReactNode;
  benefit: string;
};

type SabreRoom = {
  price: number;
  roomCode: string;
  roomName: string;
  roomDescription: string;
  cancelDeadLine: string;
};

type SaberRoomWithHotelName = {
  hotelName: string;
  price: number;
  roomCode: string;
  roomName: string;
  roomDescription: string;
  cancelDeadLine: string;
};


type SabreResponseBody = {
  propertyNameKor: string;
  propertyNameEng: string;
  destinationKor: string;
  destinationEng: string;
  cityKor: string;
  cityEng: string;
  paragonId: number;
  roomDescriptions: SabreRoom[];
};

type SelectHotelProductItemProps = {
  // 외부에서 주입 받는 프로퍼티들.
  sabreId: number;
  checkIn: Date | string;
  nights?: number;
  numOfPeople?: string;

  // 사실상 정적 값인 프로퍼티들.
  prdTitle?: string;
  benefits?: Benefit[];
  cautions?: string[];
};


// 실제 페이지에서 사용하는 데이터와 동일하게 설정
const realPageBenefits: Benefit[] = [
  {
    icon: <Utensils className="w-4 h-4 text-gray-500 px-0 py-0" />,
    benefit: '2인 조식 포함',
  },
  { 
    icon: <CreditCard className="w-4 h-4 text-gray-500" />, 
    benefit: '$100 크레딧 제공' 
  },
  {
    icon: <ArrowUpCircle className="w-4 h-4 text-gray-500" />,
    benefit: '객실 무료 업그레이드 (현장 가능시)',
  },
  {
    icon: <Clock className="w-4 h-4 text-gray-500" />,
    benefit: '얼리체크인 & 레이트 체크아웃 (현장 가능시)',
  },
];

export function SelectHotelProductItem({
  // 외부로부터 주입 받는 값
  checkIn,
  numOfPeople = '2',
  sabreId,
  nights = 1,
  
  // 사실상 정적인 프로퍼티들
  prdTitle='럭셔리 셀렉트 - 후불 현장 결제',
  benefits= realPageBenefits,
  cautions = ['현장 결제시 환율에 따라 최종 원화 결제 금액이 변동될 수 있습니다.'],
}: SelectHotelProductItemProps) {
  const [resData, setResData] = useState<SabreResponseBody | undefined | null>();
  const [isLoading, setIsLoading] = useState(false);
  const [firstRoom, setFirstRoom] = useState<SaberRoomWithHotelName | string | null | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(genSabreApiEp({ sabreId, checkIn, nights, numOfPeople }));
        const data = await res.json();
        setResData(data);
      } catch (err) {
        console.error(err);
        setResData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [checkIn, nights, numOfPeople, sabreId]);

  useEffect(() => {
      try {
        if (resData === null)
          throw new Error('no resData');
        const roomDescriptions = resData?.roomDescriptions;
        if (!roomDescriptions?.length || roomDescriptions?.length <= 0 )
          throw new Error('no roomDescription');
        const firstRoom = (roomDescriptions?.sort((a, b) => (a?.price || 0) - (b.price || 0)))[0];
        if (
          (typeof resData?.propertyNameKor !== 'string' && typeof resData?.propertyNameEng !== 'string')
          || typeof firstRoom.price !== 'number'
          || typeof firstRoom.roomDescription !== 'string'
          || typeof firstRoom.cancelDeadLine !== 'string'
          || !/^\d{8}$/.test(firstRoom.cancelDeadLine)
        )
          throw new Error('invalid room description data');
        setFirstRoom({
          hotelName: resData.propertyNameKor || resData.propertyNameEng,
          ...firstRoom,
          cancelDeadLine: firstRoom.cancelDeadLine.replace(/^(\d{4})(\d{2})(\d{2})$/, '$1-$2-$3')
        });
      } catch(err) {
        setFirstRoom('카카오톡 상담 필요');
      }
  }, [resData]);

  return (
    <div className="border-2 border-[#e5398f] overflow-hidden bg-white shadow-md md:shadow-none rounded-xl">
      <header className="bg-[#e5398f] text-white p-3 text-center sm:text-left font-medium">
        {prdTitle}
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-5 lg:gap-0 items-start justify-stretch">
        {/* Left Column: Image + Details (60%) */}
        <div className="lg:col-span-3 p-4 sm:p-6 lg:p-8 lg:pr-4 px-0 py-0">
          <div className="grid grid-cols-1 sm:grid-cols-3 md:gap-6 items-start">
            
            {/* Details Section */}
            <div className="sm:col-span-2 flex flex-col gap-3 p-4 md:p-0">
              <span className="font-semibold text-blue-600">{'[후불 현장 결제]'}</span>
              {
                (isLoading || !firstRoom) ? (
                  <div className="w-48 h-6 animate-pulse bg-gray-200 rounded-sm" />
                ) : typeof firstRoom !== 'string' && (
                  <span className="font-bold">{firstRoom.hotelName}</span>
                ) 
              }
              <div
                className="flex items-center gap-1.5 text-blue-600"
              >
                {
                  (isLoading || !firstRoom) ? (
                    <div className="w-60 h-5 animate-pulse bg-gray-200 rounded-sm" />
                  ) : typeof firstRoom !== 'string' && (
                    <>
                      <Image
                        src="https://static.priviatravel.com/images/front/mtravel/svg/ico-check-blue-circle.svg"
                        alt="Free cancellation icon"
                        width={20}
                        height={20}
                      />
                      <span className="text-sm font-medium">{firstRoom.cancelDeadLine} 까지 무료 취소</span>
                    </>
                  ) 
                }
              </div>
              <div className="pt-3 mt-1">
                <ul className="space-y-2">
                  {benefits.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-sm text-gray-600"
                    >
                      {typeof item.icon === 'string' ? (
                        <Image
                          src={item.icon || '/placeholder.svg'}
                          alt=""
                          width={16}
                          height={16}
                        />
                      ) : (
                        item.icon
                      )}
                      <span>{item.benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Pricing with divider (40%) */}
        <div className="lg:col-span-2 p-4 sm:p-6 lg:p-8 lg:border-l lg:border-dashed lg:border-gray-300 flex flex-col justify-between h-full lg:pl-12 border-t border-dashed">
          <div className="flex flex-row sm:justify-between sm:items-end mb-4 w-full gap-2 justify-between items-end">
            <span className="text-sm text-gray-500">객실 요금</span>
            <div className="text-left sm:text-right">
              <div className="text-gray-500 text-base hidden sm:block text-left">
                {nights}박 예상결제가
              </div>
              <div className="font-bold text-gray-800 text-2xl">
                {isLoading || !firstRoom ? (
                  <div className="w-40 h-8 animate-pulse bg-gray-200 rounded-sm" />
                ) : typeof firstRoom === 'string' ? (
                  firstRoom
                ) : (
                  `${firstRoom.price.toLocaleString('ko-KR')}원 ~`
                )}
              </div>
            </div>
          </div>
          <div className="w-full text-right space-y-4 mt-auto">
            {/* api 로부터 가져오는 룸 디스크립션을 사용해야 할 경우 아래 주석을 해제 할것 */}
            {/* <div dangerouslySetInnerHTML={{ __html: typeof resData !== 'string' && resData?.roomDescriptions?.length &&
                  `${resData?.roomDescriptions
                    ?.sort((a, b) => {
                      return (a?.price || 0) - (b.price || 0);
                    })[0].roomDescription.replace(/<html.+html>/, '') }` || '' }} /> */}
            {/* api 로부터 가져오는 룸 디스크립션을 사용해야 할 경우 아래 치환 섹션을 주석 처리 할것 */}
            {cautions.length > 0 && (
              <div className="text-xs text-red-500 text-left sm:text-right">
                {cautions.map((caution, index) => (
                  <div key={index}>※ {caution}</div>
                ))}
              </div>
            )}
            <a
              href="https://pf.kakao.com/_cxmxgNG/chat"
              className="inline-block bg-black text-white py-3 px-8 rounded-md hover:bg-gray-800 transition-colors w-full sm:w-auto text-center font-medium"
            >
              카카오톡 상담
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
