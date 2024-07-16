"use client";

import { Button } from "@taskfy/components/Button";
import { Section } from "@taskfy/components/Section";
import { Ranking, Trash } from "@phosphor-icons/react";
import { useDialog } from "@taskfy/hooks/useDialog";
import { DatePicker } from "@taskfy/components/DatePicker";
import { EditTaskGroupSection } from "@taskfy/components/manageTaskGroup/EditTaskGroupSection";
import { ManageTaskGroupRankingSection } from "@taskfy/components/manageTaskGroup/ManageTaskGroupRankingSection";
import { DeleteTaskGroupDialog } from "@taskfy/components/taskGroup/DeleteTaskGroupDialog";

export default function EditGroupPage() {
  const {
    isOpen: deleteTaskGroupDialogIsOpen,
    open: handleOpenDeleteTaskGroupDialog,
    close: handleCloseDeleteTaskGroupDialog,
  } = useDialog();

  return (
    <>
      <DeleteTaskGroupDialog
        handleClose={handleCloseDeleteTaskGroupDialog}
        isOpen={deleteTaskGroupDialogIsOpen}
      />

      <EditTaskGroupSection />

      <ManageTaskGroupRankingSection />

      <Section
        variant="danger"
        title="Deletar Grupo de Tarefas"
        text="Ao deletar um grupo, todas as tarefas associadas a ele também serão removidas permanentemente. Essa ação não poderá ser desfeita."
      >
        <Button
          text="Deletar grupo de tarefas"
          size="md"
          type="button"
          variant="outlinedDanger"
          leftIcon={<Trash />}
          onClick={handleOpenDeleteTaskGroupDialog}
        />
      </Section>
    </>
  );
}
