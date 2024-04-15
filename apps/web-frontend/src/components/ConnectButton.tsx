import { Button, DropdownMenu, Flex } from "@radix-ui/themes";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { useNetworkLayer } from "@/hooks/useNetworkLayer";

export default function ConnectButton() {
  const { signer, chain, connect } = useNetworkLayer();
  return (
    <>
      <Flex gap="2">
        {signer != null ? (
          <Button variant="outline" size="3" radius="none">
            <Flex direction={"row"} justify={"center"} align={"center"} gap="2">
              <img src="/logos/mina.png" alt="mina logo" className="w-4 h-4" />
              {chain.chainName}
            </Flex>
          </Button>
        ) : null}
        <DropdownMenu.Root>
          {signer === null ? (
            <Button onClick={connect} variant="outline" size="4" radius="none">
              <span>Connect</span>
            </Button>
          ) : (
            <DropdownMenu.Trigger>
              <Button
                onClick={() => {}}
                variant="outline"
                size="3"
                radius="none"
              >
                <span>{signer.slice(0, 4) + "..." + signer.slice(-4)}</span>
                <CaretDownIcon className="w-8 h-8" />
              </Button>
            </DropdownMenu.Trigger>
          )}
          <DropdownMenu.Content className="">
            <DropdownMenu.Item className="my-10">
              <Button
                onClick={() => {
                  console.log("disconnect");
                }}
                variant="outline"
                size="3"
              >
                Disconnect
              </Button>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Flex>
    </>
  );
}
