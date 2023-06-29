import { useTranslation } from "react-i18next"
import { RenderButton } from "types/components"
import { ModalButton } from "components/feedback"
import ManageCustomMoneies from "pages/custom/ManageCustomMoneies"

interface Props {
  children: RenderButton
}

const AddMoneies = ({ children: renderButton }: Props) => {
  const { t } = useTranslation()

  return (
    <ModalButton title={t("Manage list")} renderButton={renderButton}>
      <ManageCustomMoneies />
    </ModalButton>
  )
}

export default AddMoneies
