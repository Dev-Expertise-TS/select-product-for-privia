"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const react = require("react");
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Icon = react.forwardRef(
  ({
    color = "currentColor",
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    className = "",
    children,
    iconNode,
    ...rest
  }, ref) => {
    return react.createElement(
      "svg",
      {
        ref,
        ...defaultAttributes,
        width: size,
        height: size,
        stroke: color,
        strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
        className: mergeClasses("lucide", className),
        ...rest
      },
      [
        ...iconNode.map(([tag, attrs]) => react.createElement(tag, attrs)),
        ...Array.isArray(children) ? children : [children]
      ]
    );
  }
);
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const createLucideIcon = (iconName, iconNode) => {
  const Component = react.forwardRef(
    ({ className, ...props }, ref) => react.createElement(Icon, {
      ref,
      iconNode,
      className: mergeClasses(`lucide-${toKebabCase(iconName)}`, className),
      ...props
    })
  );
  Component.displayName = `${iconName}`;
  return Component;
};
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const CircleArrowUp = createLucideIcon("CircleArrowUp", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m16 12-4-4-4 4", key: "177agl" }],
  ["path", { d: "M12 16V8", key: "1sbj14" }]
]);
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Clock = createLucideIcon("Clock", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
]);
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const CreditCard = createLucideIcon("CreditCard", [
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "2", key: "ynyp8z" }],
  ["line", { x1: "2", x2: "22", y1: "10", y2: "10", key: "1b3vmo" }]
]);
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Utensils = createLucideIcon("Utensils", [
  ["path", { d: "M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2", key: "cjf0a3" }],
  ["path", { d: "M7 2v20", key: "1473qp" }],
  ["path", { d: "M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7", key: "j28e5" }]
]);
const getValidDate = (date) => {
  const _date = new Date(date);
  if (isNaN(_date.valueOf())) {
    throw new Error("Invalid Date");
  }
  return _date;
};
const destructDate = (date) => {
  try {
    const _date = getValidDate(date);
    return [
      _date.getFullYear(),
      _date.getMonth(),
      _date.getDate(),
      _date.getHours(),
      _date.getMinutes(),
      _date.getSeconds(),
      _date.getMilliseconds()
    ];
  } catch (err) {
    throw new Error("cannot destruct Date");
  }
};
const formatParamDate = (date) => {
  try {
    const _date = getValidDate(date);
    const [year, M, d] = destructDate(_date);
    const _M = M + 1;
    const month = _M < 10 ? `0${_M}` : `${_M}`;
    const day = d < 10 ? `0${d}` : `${d}`;
    return `${year}-${month}-${day}`;
  } catch (err) {
    throw new Error("cannot format Date");
  }
};
const genSabreApiEp = ({
  sabreId,
  checkIn,
  nights = 1,
  numOfPeople = "2"
}) => {
  try {
    const _checkIn = formatParamDate(checkIn);
    return `https://sabre-nodejs-9tia3.ondigitalocean.app/public/hotel/sabre/${sabreId}/select-rooms-price/?check_in=${_checkIn}&nights=${nights}&number_of_people=${numOfPeople}`;
  } catch (err) {
    throw new Error("cannot generate Sabre API Endpoint. Invalid checkIn value is given.");
  }
};
function SelectHotelProductItem({
  // 외부로부터 주입 받는 값
  checkIn,
  numOfPeople = "2",
  sabreId,
  nights = 1
}) {
  const [resData, setResData] = react.useState();
  const [isLoading, setIsLoading] = react.useState(false);
  const [firstRoom, setFirstRoom] = react.useState();
  react.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const url = genSabreApiEp({ sabreId, checkIn, nights, numOfPeople });
        const res = await fetch(url, {
          method: "GET",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          mode: "cors"
          // CORS 명시적 설정
        });
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const text = await res.text();
        const data = JSON.parse(text);
        setResData(data);
      } catch (err) {
        console.error("Fetch error:", err);
        if (err instanceof TypeError && err.message.includes("Failed to fetch")) {
          console.error("CORS error or network issue. Check browser console for details.");
        }
        setResData(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [checkIn, nights, numOfPeople, sabreId]);
  react.useEffect(() => {
    try {
      if (resData === null)
        throw new Error("no resData");
      const roomDescriptions = resData == null ? void 0 : resData.roomDescriptions;
      if (!(roomDescriptions == null ? void 0 : roomDescriptions.length) || (roomDescriptions == null ? void 0 : roomDescriptions.length) <= 0)
        throw new Error("no roomDescription");
      const firstRoom2 = (roomDescriptions == null ? void 0 : roomDescriptions.sort((a, b) => ((a == null ? void 0 : a.price) || 0) - (b.price || 0)))[0];
      if (typeof (resData == null ? void 0 : resData.propertyNameKor) !== "string" && typeof (resData == null ? void 0 : resData.propertyNameEng) !== "string" || typeof firstRoom2.price !== "number" || typeof firstRoom2.roomDescription !== "string" || typeof firstRoom2.cancelDeadLine !== "string" || !/^\d{8}$/.test(firstRoom2.cancelDeadLine))
        throw new Error("invalid room description data");
      setFirstRoom({
        hotelName: resData.propertyNameKor || resData.propertyNameEng,
        ...firstRoom2,
        cancelDeadLine: firstRoom2.cancelDeadLine.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3")
      });
    } catch (err) {
      setFirstRoom("카카오톡 상담 필요");
    }
  }, [resData]);
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      className: "overflow-hidden bg-white shadow-md md:shadow-none rounded-xl",
      style: {
        border: "1px solid #e5398f",
        marginTop: "30px"
      },
      children: [
        /* @__PURE__ */ jsxRuntime.jsx("header", { className: "bg-[#e5398f] text-white p-3 text-center sm:text-left font-medium", children: "럭셔리 셀렉트 - 후불 현장 결제" }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-5 lg:gap-0 items-start justify-stretch", children: [
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "lg:col-span-3 p-4 sm:p-6 lg:p-8 lg:pr-4 px-0 py-0", children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 md:gap-6 items-start", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "sm:col-span-2 flex flex-col gap-3 p-4 md:p-0", children: [
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-semibold text-blue-600", children: "[후불 현장 결제]" }),
            isLoading || !firstRoom ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "w-48 h-6 animate-pulse bg-gray-200 rounded-sm" }) : typeof firstRoom !== "string" && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-bold", children: firstRoom.hotelName }),
            /* @__PURE__ */ jsxRuntime.jsx(
              "div",
              {
                className: "flex items-center gap-1.5 text-blue-600",
                children: isLoading || !firstRoom ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "w-60 h-5 animate-pulse bg-gray-200 rounded-sm" }) : typeof firstRoom !== "string" && /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntime.jsx(
                    "img",
                    {
                      src: "https://static.priviatravel.com/images/front/mtravel/svg/ico-check-blue-circle.svg",
                      alt: "Free cancellation icon",
                      width: 20,
                      height: 20
                    }
                  ),
                  /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "text-sm font-medium", children: [
                    firstRoom.cancelDeadLine,
                    " 까지 무료 취소"
                  ] })
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx("div", { className: "pt-3 mt-1", children: /* @__PURE__ */ jsxRuntime.jsx("ul", { className: "space-y-2", children: [
              {
                icon: /* @__PURE__ */ jsxRuntime.jsx(Utensils, { className: "w-4 h-4 text-gray-500 px-0 py-0" }),
                benefit: "2인 조식 포함"
              },
              {
                icon: /* @__PURE__ */ jsxRuntime.jsx(CreditCard, { className: "w-4 h-4 text-gray-500" }),
                benefit: "$100 크레딧 제공"
              },
              {
                icon: /* @__PURE__ */ jsxRuntime.jsx(CircleArrowUp, { className: "w-4 h-4 text-gray-500" }),
                benefit: "객실 무료 업그레이드 (현장 가능시)"
              },
              {
                icon: /* @__PURE__ */ jsxRuntime.jsx(Clock, { className: "w-4 h-4 text-gray-500" }),
                benefit: "얼리체크인 & 레이트 체크아웃 (현장 가능시)"
              }
            ].map((item, index) => /* @__PURE__ */ jsxRuntime.jsxs(
              "li",
              {
                className: "flex items-center gap-2 text-sm text-gray-600",
                children: [
                  typeof item.icon === "string" ? /* @__PURE__ */ jsxRuntime.jsx(
                    "img",
                    {
                      src: item.icon || "/placeholder.svg",
                      alt: "",
                      width: 16,
                      height: 16
                    }
                  ) : item.icon,
                  /* @__PURE__ */ jsxRuntime.jsx("span", { children: item.benefit })
                ]
              },
              index
            )) }) })
          ] }) }) }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "lg:col-span-2 p-4 sm:p-6 lg:p-8 lg:border-l lg:border-dashed lg:border-gray-300 flex flex-col justify-between h-full lg:pl-12 border-t border-dashed lg:border-t-0", children: [
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-row sm:justify-between sm:items-end mb-4 w-full gap-2 justify-between items-end", children: [
              /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-sm text-gray-500", children: "객실 요금" }),
              /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "text-left sm:text-right", children: [
                /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "text-gray-500 hidden sm:block text-left", children: [
                  nights,
                  "박 예상결제가"
                ] }),
                /* @__PURE__ */ jsxRuntime.jsx("div", { className: "font-bold text-gray-800 text-2xl", children: isLoading || !firstRoom ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "w-40 h-8 animate-pulse bg-gray-200 rounded-sm" }) : typeof firstRoom === "string" ? firstRoom : `${firstRoom.price.toLocaleString("ko-KR")}원 ~` })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "w-full text-right space-y-4 mt-auto", children: [
              /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-xs text-red-500 text-left sm:text-right", children: /* @__PURE__ */ jsxRuntime.jsx("div", { children: "※ 현장 결제시 환율에 따라 최종 원화 결제 금액이 변동될 수 있습니다." }) }),
              /* @__PURE__ */ jsxRuntime.jsx(
                "a",
                {
                  href: "https://pf.kakao.com/_cxmxgNG/chat",
                  className: "inline-block bg-black text-white py-3 px-8 rounded-md hover:bg-gray-800 transition-colors w-full sm:w-auto text-center font-medium",
                  children: "카카오톡 상담"
                }
              )
            ] })
          ] })
        ] })
      ]
    }
  );
}
exports.SelectHotelProductItem = SelectHotelProductItem;
//# sourceMappingURL=select-hotel-product-item.cjs.js.map
