import { Dialog } from "./ui/dialog";

type CreateQuizDialogProps = {
  open: boolean;
};

const CreateQuizDialog = ({ open }: CreateQuizDialogProps) => {
  return <Dialog open={open}></Dialog>;
};

export default CreateQuizDialog;
