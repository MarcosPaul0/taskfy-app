export interface NewRewardDialogProps {
  isOpen: boolean;
  handleChangeIsOpen: (isOpen: boolean) => void
  refetchRewards: () => Promise<void>
}