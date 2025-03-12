import { FC, ReactNode } from "react";
import { Button } from "@/shared/components/FormElements/Button.tsx";

interface Props {
  firstButtonText: string;
  secondButtonText: string;
  children?: ReactNode;
  onClickFirstButton: () => void;
  onClickSecondButton: () => void;
}

export const ModalButtonRow: FC<Props> = ({
  firstButtonText,
  secondButtonText,
  children,
  onClickFirstButton,
  onClickSecondButton,
}) => {
  return (
    <div className="place-item__modal-actions">
      <Button inverse onClick={onClickFirstButton}>
        {firstButtonText}
      </Button>
      {children}
      <Button danger onClick={onClickSecondButton}>
        {secondButtonText}
      </Button>
    </div>
  );
};
