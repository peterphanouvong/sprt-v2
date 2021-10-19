import { Divider, Heading } from "@chakra-ui/layout";
import React, { useState } from "react";
import { useUpdateQuickEventMutation } from "../generated/graphql";
import { QuickEventAttendeeTable } from "./QuickEventAttendeeTable";
import { DragDropContext } from "react-beautiful-dnd";
import { QuickEventAttendeeTableAdminView } from "./QuickEventAttendeeTableAdminView";

interface Props {
  attendees: any;
  queryData: any;
  isAdmin: boolean;
  quickEventId: number;
}

const QuickEventTables: React.FC<Props> = ({
  isAdmin,
  attendees,
  queryData,
  quickEventId,
}) => {
  const [confirmedAttendees, setConfirmedAttendees] = useState<
    Record<number, boolean>
  >(
    (
      attendees ||
      (queryData !== undefined
        ? JSON.parse(queryData.quickEvent?.users as string)
        : [])
    ).reduce((map, obj) => {
      if (obj.status == "confirmed") {
        map[obj.email] = true;
      } else {
        map[obj.email] = false;
      }

      return map;
    }, {}) ?? {}
  );

  const [, updateQuickEvent] = useUpdateQuickEventMutation();
  const confirmAttendee = (email: string) => {
    updateQuickEvent({
      updateQuickEventId: quickEventId,
      updateQuickEventInput: {
        users: JSON.stringify(
          (attendees || JSON.parse(queryData.quickEvent?.users as string)).map(
            (u) => {
              if (u.email == email) {
                return {
                  ...u,
                  status: "confirmed",
                };
              }
              return u;
            }
          )
        ),
      },
    });
  };

  const removeAttendee = (email: string) => {
    updateQuickEvent({
      updateQuickEventId: quickEventId,
      updateQuickEventInput: {
        users: JSON.stringify(
          (attendees || JSON.parse(queryData.quickEvent?.users as string)).map(
            (u) => {
              if (u.email == email) {
                console.log(u);
                return {
                  ...u,
                  status: "waitlist",
                };
              }
              return u;
            }
          )
        ),
      },
    });
  };

  const removeWaitListAttendee = async (email: string) => {
    console.log(email);
    console.log(attendees);

    await updateQuickEvent({
      updateQuickEventId: quickEventId,
      updateQuickEventInput: {
        users: JSON.stringify(
          (
            attendees || JSON.parse(queryData.quickEvent?.users as string)
          ).filter((u) => {
            if (u.email !== email) {
              console.log(u);
              return u;
            }
            // return u;
          })
        ),
      },
    });
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    console.log("on drag end");
    console.log(result);

    const waitlist = JSON.parse(queryData.quickEvent?.users as string).filter(
      (u) => u.status === "waitlist"
    );
    const confirmedUsers = JSON.parse(
      queryData.quickEvent?.users as string
    ).filter((u) => u.status === "confirmed");
    console.log(waitlist);

    const [moved] = waitlist.splice(result.source.index, 1);
    waitlist.splice(result.destination.index, 0, moved);
    console.log(waitlist);

    updateQuickEvent({
      updateQuickEventId: quickEventId,
      updateQuickEventInput: {
        users: JSON.stringify([...confirmedUsers, ...waitlist]),
      },
    });
  };

  return (
    <>
      <Heading mt={4} variant='h3'>
        Confirmed (
        {
          (
            attendees || JSON.parse(queryData.quickEvent?.users as string)
          ).filter((u) => confirmedAttendees[u.email]).length
        }
        )
      </Heading>

      <QuickEventAttendeeTable
        quickEventId={quickEventId}
        confirmedAttendees={confirmedAttendees}
        setConfirmedAttendees={setConfirmedAttendees}
        isAdmin={isAdmin}
        users={(
          attendees || JSON.parse(queryData.quickEvent?.users as string)
        ).filter((u) => confirmedAttendees[u.email])}
        confirmAttendee={confirmAttendee}
        removeAttendee={removeAttendee}
        removeWaitlistAttendee={removeWaitListAttendee}
        onDragEnd={onDragEnd}
      />
      <Divider my={6} />
      <Heading mt={4} variant='h3'>
        Waitlist (
        {
          (
            attendees || JSON.parse(queryData.quickEvent?.users as string)
          ).filter((u) => !confirmedAttendees[u.email]).length
        }
        )
      </Heading>

      {isAdmin ? (
        <QuickEventAttendeeTableAdminView
          quickEventId={quickEventId}
          confirmedAttendees={confirmedAttendees}
          setConfirmedAttendees={setConfirmedAttendees}
          isAdmin={isAdmin}
          isWaitlist={true}
          users={(
            attendees || JSON.parse(queryData.quickEvent?.users as string)
          ).filter((u) => !confirmedAttendees[u.email])}
          confirmAttendee={confirmAttendee}
          removeAttendee={removeAttendee}
          removeWaitlistAttendee={removeWaitListAttendee}
          onDragEnd={onDragEnd}
        />
      ) : (
        <QuickEventAttendeeTable
          quickEventId={quickEventId}
          confirmedAttendees={confirmedAttendees}
          setConfirmedAttendees={setConfirmedAttendees}
          isAdmin={isAdmin}
          isWaitlist={true}
          users={(
            attendees || JSON.parse(queryData.quickEvent?.users as string)
          ).filter((u) => !confirmedAttendees[u.email])}
          confirmAttendee={confirmAttendee}
          removeAttendee={removeAttendee}
          removeWaitlistAttendee={removeWaitListAttendee}
          onDragEnd={onDragEnd}
        />
      )}
    </>
  );
};

export { QuickEventTables };
