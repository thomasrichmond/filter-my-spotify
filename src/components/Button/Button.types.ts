export interface IButtonProps {
  label: string;
  link?: string;
  click?: (e: any) => void | Promise<void> | any;
  type?: 'button' | 'submit' | 'reset';

}