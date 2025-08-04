import { FC } from 'react';

export interface SelectHotelProductItemProps {
  sabreId: number;
  checkIn: Date | string;
  nights?: number;
  numOfPeople?: string;
}

export declare const SelectHotelProductItem: FC<SelectHotelProductItemProps>;

declare const SelectHotelProductWidget: any;
export default SelectHotelProductWidget;
