import { ContentLayout, TableLayout, ModalLayout } from "shared/components";
import { TrainingPartnerFilter } from "..";
export const TrainingPartnerList = () => {
  return (
    <ContentLayout
      title={"Training Partner"}
      subtitle={"Training Partner List"}
      breadcrumb={[{ label: "Training Partner", location: "/trainingpartner" }]}
    >
      <TrainingPartnerFilter />
    </ContentLayout>
  );
};
