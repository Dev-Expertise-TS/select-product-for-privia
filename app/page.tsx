import { SelectHotelProductItem } from '@/components/select-hotel-product-item';
import { CreditCard, Clock, ArrowUpCircle, Utensils } from 'lucide-react';

export default function Home() {
  const hotelProduct = {
    prdTitle: '럭셔리 셀렉트 - 후불 현장 결제',
    benefits: [
      {
        icon: <Utensils className="w-4 h-4 text-gray-500 px-0 py-0" />,
        benefit: '2인 조식 포함',
      },
      { icon: <CreditCard className="w-4 h-4 text-gray-500" />, benefit: '$100 크레딧 제공' },
      {
        icon: <ArrowUpCircle className="w-4 h-4 text-gray-500" />,
        benefit: '객실 무료 업그레이드 (현장 가능시)',
      },
      {
        icon: <Clock className="w-4 h-4 text-gray-500" />,
        benefit: '얼리체크인 & 레이트 체크아웃 (현장 가능시)',
      },
    ],
    pricingType: '일반요금',
    nights: 1,
    cautions: ['현장 결제시 환율에 따라 최종 원화 결제 금액이 변동될 수 있습니다.'],
    sabreId: 383336,
    checkIn: '2025-08-12',
    numOfPeople: '2',
  };

  return (
    <div className="bg-gray-100 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <SelectHotelProductItem {...hotelProduct} />
      </div>
    </div>
  );
}
