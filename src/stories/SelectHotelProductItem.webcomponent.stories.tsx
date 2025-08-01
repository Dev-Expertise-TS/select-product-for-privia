import type { Meta, StoryObj } from '@storybook/react';
import { useEffect } from 'react';
import '../components/select-hotel-product-item.web-component';

// 웹 컴포넌트 타입 선언
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'select-hotel-product': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'sabre-id'?: number | string;
        'check-in'?: string;
        'nights'?: number | string;
        'num-of-people'?: string;
      };
    }
  }
}

// 웹 컴포넌트를 위한 React 래퍼
const SelectHotelProductItemWC = (props: any) => {
  useEffect(() => {
    // 웹 컴포넌트가 등록되었는지 확인
    if (!customElements.get('select-hotel-product')) {
      import('../components/select-hotel-product-item.web-component');
    }
  }, []);

  return (
    <select-hotel-product
      sabre-id={props.sabreId}
      check-in={props.checkIn}
      nights={props.nights}
      num-of-people={props.numOfPeople}
    />
  );
};

const meta = {
  title: 'Web Components/SelectHotelProductItem',
  component: SelectHotelProductItemWC,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    sabreId: {
      control: 'number',
      description: 'Sabre 호텔 ID',
    },
    checkIn: {
      control: 'text',
      description: '체크인 날짜 (YYYY-MM-DD)',
    },
    nights: {
      control: 'number',
      description: '숙박 일수',
    },
    numOfPeople: {
      control: 'text',
      description: '투숙 인원',
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
};