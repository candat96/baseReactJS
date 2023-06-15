import { ActionIcon, Button, Text, ThemeIcon } from '@mantine/core';

type Status = 'success' | 'error' | 'warning';

const StatusColor: { [key: string]: string } = {
  success: 'green',
  error: 'red',
  warning: 'yellow',
};
const StatusCall: { [key: string]: string } = {
  success: 'Đã trả lời',
  error: 'Không trả lời',
  warning: 'Không phản hồi',
};

interface IProps {
  status: Status;
}
const ButtonStatusCall = (props: IProps) => {
  const { status } = props;

  return (
    <ThemeIcon className="w-[118px] h-7" color={StatusColor[status]} variant="light">
      <Text className="whitespace-pre" c={StatusColor[status]}>
        {StatusCall[status]}
      </Text>
    </ThemeIcon>
  );
};

export default ButtonStatusCall;
