import { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { v4 as uuid } from "uuid";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectActivity] = useState<Activity | undefined>(
    undefined
  );
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios
      .get<Activity[]>("http://localhost:5000/api/activities")
      .then((response) => {
        setActivities(response.data);
      });
  }, []);

  function handleSelectActivity(id: string) {
    setSelectActivity(activities.find((x) => x.id === id));
  }

  function cancelSelectActivity() {
    setSelectActivity(undefined);
  }

  function handleOpenForm(id?: string) {
    id ? handleSelectActivity(id) : undefined;
    setEditMode(true);
  }

  function handleCloseForm() {
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity: Activity) {
    activity.id
      ? setActivities([
          ...activities.filter((x) => x.id !== activity.id),
          activity,
        ])
      : setActivities([...activities, { ...activity, id: uuid() }]);
    setEditMode(false);
    setSelectActivity(activity);
  }

  function handleDeleteActivity(id:string){
    setActivities([...activities.filter(x=>x.id!==id)]);
  }

  return (
    <>
      <NavBar handleOpenForm={handleOpenForm} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          handleSelectActivity={handleSelectActivity}
          cancelSelectActivity={cancelSelectActivity}
          editMode={editMode}
          handleOpenForm={handleOpenForm}
          handleCloseForm={handleCloseForm}
          addOrEdit={handleCreateOrEditActivity}
          handleDeleteActivity={handleDeleteActivity}
        />
      </Container>
    </>
  );
}

export default App;
