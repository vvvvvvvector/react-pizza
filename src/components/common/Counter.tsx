export const Counter = ({
  amount,
  counterStyle
}: {
  amount: number;
  counterStyle: string;
}) => {
  return (
    <div className={counterStyle}>
      <b>{amount}</b>
    </div>
  );
};
