import { ChevronDownIcon, WarningIcon } from "@chakra-ui/icons";
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Skeleton,
  ButtonProps,
} from "@chakra-ui/react";
import React from "react";
import { useClubQuery, useMeQuery } from "../generated/graphql";
import { useIsMobileScreen } from "../utils/useIsMobileScreen";
import { ClubDeleteButton } from "./ClubDeleteButton";
import { ClubEditButton } from "./ClubEditButton";

type Props = ButtonProps & {
  clubId: number;
};
const ClubOptionsButton: React.FC<Props> = ({ clubId, ...props }) => {
  const [{ data, fetching }] = useMeQuery();
  const [{ data: clubData, fetching: fetchingClub }] = useClubQuery({
    pause: clubId === -1,
    variables: {
      clubId: clubId,
    },
  });
  const isMobile = useIsMobileScreen();
  return (
    <Skeleton isLoaded={!fetching && !fetchingClub && !!clubData}>
      <Menu>
        <MenuButton
          size={isMobile ? "xs" : "sm"}
          variant="outline"
          as={IconButton}
          aria-label="Options"
          icon={<ChevronDownIcon />}
          colorScheme="gray"
          onClick={(e) => e.stopPropagation()}
          {...props}
        />
        <MenuList>
          {clubData?.club.admins
            .map((x) => x.id)
            .includes(data?.me?.id || 0) ? (
            <>
              <ClubEditButton clubId={clubId} as="menuItem" />
              <ClubDeleteButton clubId={clubId} as="modalItem" />
            </>
          ) : (
            <MenuItem icon={<WarningIcon />}>Report</MenuItem>
          )}
        </MenuList>
      </Menu>
    </Skeleton>
  );
};

export { ClubOptionsButton };
