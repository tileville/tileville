import { Button, Dialog, Flex } from '@radix-ui/themes';
import { useNetworkLayer } from '../hooks/useNetworkLayer';
import { FAUCET_URL } from '../../constants';

export const GameEntryFeesModal = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const { signer, transferEntryFee } = useNetworkLayer();
  return (
    <Dialog.Root open={open}>
      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>Pay Entry Fees</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          You need to pay one time entry fees of 2 MINA token to play this game.
          If you don't have tokens, you can get it from{' '}
          <a
            href={`${FAUCET_URL}?address=${signer}`}
            target="_blank"
            className="font-semibold underline text-md"
          >
            here
          </a>
        </Dialog.Description>
        <Dialog.Description size="2" mb="4" className="font-semibold">
          Make sure to click on Play button again after paying the fees!
        </Dialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray" onClick={handleClose}>
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button
              onClick={async () => {
                await transferEntryFee();
                handleClose();
              }}
            >
              Pay Entry Fees
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};
