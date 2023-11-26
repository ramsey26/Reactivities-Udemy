import { Activity } from "../../../app/models/activity";
import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

interface Props {
  activities: Activity[];
  selectedActivity: Activity | undefined;
  handleSelectActivity: (id: string) => void;
  cancelSelectActivity: () => void;
  editMode: boolean;
  handleOpenForm: (id: string) => void;
  handleCloseForm: () => void;
  addOrEdit: (activity: Activity) => void;
  handleDeleteActivity: (id: string) => void;
  submitting: boolean;
}

export default function ActivityDashboard({
  activities,
  selectedActivity,
  handleSelectActivity,
  cancelSelectActivity,
  editMode,
  handleCloseForm,
  handleOpenForm,
  addOrEdit,
  handleDeleteActivity,
  submitting,
}: Props) {
  return (
    <Grid>
      <Grid.Column width='10'>
        <ActivityList
          submitting={submitting}
          activities={activities}
          handleSelectActivity={handleSelectActivity}
          handleDeleteActivity={handleDeleteActivity}
        />
      </Grid.Column>
      <Grid.Column width='6'>
        {selectedActivity && !editMode && (
          <ActivityDetails
            activity={selectedActivity}
            cancelSelectActivity={cancelSelectActivity}
            handleCloseForm={handleCloseForm}
            handleOpenForm={handleOpenForm}
          />
        )}
        {editMode && (
          <ActivityForm
            submitting={submitting}
            handleCloseForm={handleCloseForm}
            activity={selectedActivity}
            addOrEdit={addOrEdit}
          />
        )}
      </Grid.Column>
    </Grid>
  );
}
