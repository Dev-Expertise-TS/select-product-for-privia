import type { Meta, StoryObj } from '@storybook/react';
import React, { useEffect } from 'react';
import '../components/select-hotel-product-item.web-component';



// 웹 컴포넌트를 위한 React 래퍼
const SelectHotelProductItemWC = (props: any) => {
  useEffect(() => {
    // 웹 컴포넌트가 등록되었는지 확인
    if (!customElements.get('select-hotel-product')) {
      import('../components/select-hotel-product-item.web-component');
    }
  }, []);

  // 웹 컴포넌트를 위한 타입 단언
  const SelectHotelProduct = 'select-hotel-product' as keyof JSX.IntrinsicElements;
  
  return React.createElement(SelectHotelProduct, {
    'sabre-id': props.sabreId,
    'check-in': props.checkIn,
    'nights': props.nights,
    'num-of-people': props.numOfPeople,
  } as any);
};

const meta = {
  title: 'Web Components/SelectHotelProductItem',
  component: SelectHotelProductItemWC,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `호텔 상품을 선택하고 표시하는 웹 컴포넌트입니다. React 컴포넌트를 웹 컴포넌트로 변환하여 프레임워크에 구애받지 않고 사용할 수 있습니다.

## 사용 방법
\`\`\`html
<select-hotel-product 
  sabre-id="383336"
  check-in="2025-08-12"
  nights="1"
  num-of-people="2">
</select-hotel-product>
\`\`\``,
      },
    },
  },
  argTypes: {
    sabreId: {
      control: 'number',
      description: 'Sabre 시스템의 호텔 고유 식별자',
      table: {
        type: { summary: 'number | string' },
        category: '필수',
      },
    },
    checkIn: {
      control: 'text',
      description: '체크인 날짜 (YYYY-MM-DD 형식)',
      table: {
        type: { summary: 'string' },
        category: '필수',
      },
    },
    nights: {
      control: 'number',
      description: '숙박 일수',
      table: {
        type: { summary: 'number | string' },
        defaultValue: { summary: '1' },
        category: '선택',
      },
    },
    numOfPeople: {
      control: 'text',
      description: '투숙 인원 수투숙 인원 수를 나타내는 formatted string',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '"2"' },
        category: '선택',
      },
    },
  },
} satisfies Meta<typeof SelectHotelProductItemWC>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    sabreId: 383336,
    checkIn: '2025-08-12',
    nights: 1,
    numOfPeople: '2',
  },
  parameters: {
    docs: {
      description: {
        story: '웹 컴포넌트 사용 예제입니다. HTML에서 <select-hotel-product> 태그로 사용할 수 있습니다.',
      },
    },
  },
};