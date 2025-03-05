import {Earthquake} from "graphql-common/src";

export type UpdateFormValues = Partial<Earthquake>;

export type UpdateFormProps = {
  onCancel: () => void;
  onSubmit: (values: UpdateFormValues) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  updateModalOpen: boolean;
  values: UpdateFormValues;
};
