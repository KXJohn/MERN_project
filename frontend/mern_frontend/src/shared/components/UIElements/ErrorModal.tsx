import { FC, Ref } from "react";

import { Modal } from "@/shared/components/UIElements/Modal.tsx";
import { Button } from "@/shared/components/FormElements/Button.tsx";
import { stringIsNotNullOrWhiteSpace } from "@/shared/utilities.ts";

interface Props {
  ref: Ref<HTMLDivElement>;
  error: string;
  onClear: () => void;
}

const ErrorModal: FC<Props> = ({ ref, error, onClear }) => {
  return (
    <Modal
      ref={ref}
      onCancel={onClear}
      header="An Error Occurred!"
      show={stringIsNotNullOrWhiteSpace(error)}
      footer={<Button onClick={onClear}>Okay</Button>}
    >
      <p>{error}</p>
    </Modal>
  );
};

export default ErrorModal;
