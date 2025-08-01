import type { Meta, StoryObj } from '@storybook/react';
import { SelectHotelProductItem } from '../components/select-hotel-product-item';

const meta = {
  title: 'React Components/SelectHotelProductItem',
  component: SelectHotelProductItem,
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
} satisfies Meta<typeof SelectHotelProductItem>;

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