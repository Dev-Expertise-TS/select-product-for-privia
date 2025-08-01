export {};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'select-hotel-product': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'sabre-id'?: number | string;
          'check-in'?: string;
          'nights'?: number | string;
          'num-of-people'?: string;
        },
        HTMLElement
      >;
    }
  }
}