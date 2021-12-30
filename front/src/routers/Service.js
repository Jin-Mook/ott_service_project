import React, { useState } from "react";
import { Redirect, Switch, Route, useHistory } from "react-router-dom";
import MovieGenre from "../component/MovieGenre";
import MusicGenre from "../component/MusicGenre";
import Stepper, { useStepper } from "../component/Stepper";
import PageLayout from "../component/PageLayout";

const Service = () => {
  const [changeGenre, setChangeGenre] = useState(true);
  const history = useHistory();
  const register = useStepper();

  return (
    <PageLayout title="Sound of movie">
      <Stepper {...register()}>
        <MovieGenre />
        <MusicGenre />
        <div>
          끝났습니다.
          <button onClick={() => history.push("/result")}>
            메인 페이지로 이동
          </button>
        </div>
      </Stepper>
    </PageLayout>
  );
};

export default Service;
