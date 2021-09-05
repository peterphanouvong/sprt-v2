import {
  Checkbox,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  Heading,
  Divider,
  Stack,
  Icon,
  Spinner,
  CheckboxGroup,
  ButtonProps,
} from "@chakra-ui/react";
import React from "react";
import { BsFunnel } from "react-icons/bs";
import { Club, PublicityType, useMeQuery } from "../generated/graphql";
import { useIsMobileScreen } from "../utils/useIsMobileScreen";

type Props = ButtonProps & {
  clubs: Club[];
  selectedClubs: Record<string, boolean>;
  setSelectedClubs: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
  publicityTypes: PublicityType[];
  selectedPublicityTypes: Record<string, boolean>;
  setSelectedPublicityTypes: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
};

const EventListFilter: React.FC<Props> = ({
  clubs,
  selectedClubs,
  setSelectedClubs,
  publicityTypes,
  selectedPublicityTypes,
  setSelectedPublicityTypes,
  ...props
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [{ data, fetching }] = useMeQuery();
  const btnRef = React.useRef() as React.MutableRefObject<HTMLButtonElement>;

  const isMobile = useIsMobileScreen();

  if (!data) return <Spinner />;
  if (!data && !fetching) return <>ya dun fucked it</>;

  return (
    <>
      <Button
        {...props}
        leftIcon={<Icon as={BsFunnel} />}
        ref={btnRef}
        variant="outline"
        onClick={onOpen}
      >
        Filter
      </Button>
      <Drawer
        isOpen={isOpen}
        placement={isMobile ? "top" : "right"}
        onClose={onClose}
        finalFocusRef={btnRef}
        size="xs"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Filter your feed</DrawerHeader>
          <DrawerBody>
            <Stack spacing={6}>
              <div>
                <Heading variant="h6" fontWeight="semibold" fontSize="md">
                  Event type
                </Heading>
                <Divider mb={4} />
                <Stack>
                  {publicityTypes.map((pt) => (
                    <Checkbox
                      key={pt.id}
                      onChange={() => {
                        // e.preventDefault();
                        setSelectedPublicityTypes({
                          ...selectedPublicityTypes,
                          [pt.id]: !selectedPublicityTypes[pt.id],
                        });
                      }}
                      defaultChecked={selectedPublicityTypes[pt.id]}
                    >
                      {pt.name}
                    </Checkbox>
                  ))}
                </Stack>
              </div>
              <div>
                <Heading variant="h6" fontWeight="semibold" fontSize="md">
                  Club
                </Heading>
                <Divider mb={4} />
                <Stack>
                  <CheckboxGroup>
                    {clubs.map((club) => (
                      <Checkbox
                        key={club.id}
                        onChange={() => {
                          // e.preventDefault();
                          setSelectedClubs({
                            ...selectedClubs,
                            [club.id]: !selectedClubs[club.id],
                          });
                        }}
                        defaultChecked={selectedClubs[club.id]}
                      >
                        {club.name}
                      </Checkbox>
                    ))}
                  </CheckboxGroup>
                </Stack>
              </div>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export { EventListFilter };
