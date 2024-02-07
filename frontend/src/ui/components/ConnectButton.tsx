import { Button, DropdownMenu, Flex } from '@radix-ui/themes';
import { CaretDownIcon } from '@radix-ui/react-icons';
import { useState, useContext, useEffect } from 'react';
import { SignerContext, ChainContext } from '../../contexts';
import { Network } from '../../types';
import toast from 'react-hot-toast';

export default function ConnectButton() {
  const { signer, setSigner } = useContext(SignerContext);
  const { chain, setChain } = useContext(ChainContext);

  const [showWalletPopup, setShowWalletPopup] = useState(false);

  useEffect(() => {
    const mina = (window as any).mina;
    if (mina) {
      mina.on('chainChanged', (network: Network) => {
        setChain({ chainId: network.chainId, chainName: network.name });
      });
    }
  }, []);

  const handleConnection = async () => {
    if (typeof (window as any).mina == 'undefined') {
      setShowWalletPopup(true);
    } else {
      const accounts = await (window as any).mina.requestAccounts();
      const network = await (window as any).mina.requestNetwork();
      setSigner(accounts[0]);
      setChain({ chainId: network.chainId, chainName: network.name });
    }
  };

  return (
    <>
      <Flex gap="2">
        {signer != null ? (
          <Button variant="outline" size="4" radius="none">
            <Flex direction={'row'} justify={'center'} align={'center'} gap="2">
              <img src="/logos/mina.png" alt="mina logo" className="w-4 h-4" />
              {chain.chainName}
            </Flex>
          </Button>
        ) : null}
        <DropdownMenu.Root>
          {signer === null ? (
            <Button
              onClick={handleConnection}
              variant="outline"
              size="4"
              radius="none"
              color="blue"
            >
              <span>Connect</span>
            </Button>
          ) : (
            <DropdownMenu.Trigger>
              <Button
                onClick={() => {}}
                variant="outline"
                size="4"
                radius="none"
                color="blue"
              >
                <span>{signer.slice(0, 4) + '...' + signer.slice(-4)}</span>
                <CaretDownIcon className="w-8 h-8" />
              </Button>
            </DropdownMenu.Trigger>
          )}
          <DropdownMenu.Content>
            <DropdownMenu.Item>
              <Button
                onClick={() => {
                  console.log('disconnect');
                }}
                variant="outline"
                color="blue"
              >
                Disconnect
              </Button>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
        {showWalletPopup && toast('Please install Auro wallet')}
      </Flex>
    </>
  );
}
