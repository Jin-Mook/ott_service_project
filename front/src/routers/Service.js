import MovieGenre from "../component/MovieGenre";
import MusicGenre from "../component/MusicGenre";
import FilterMovie from "../component/FilterMovie";
import Stepper, { useStepper } from "../component/useStepper";
import PageLayout from "../component/PageLayout.jsx";
import { LastLoading } from "../component/Spninner";

const Service = ({ history }) => {
    const { step, onNext, onPrev } = useStepper(); //커스텀 훅 만든 것

    return (
        <div>
            <PageLayout title="음악을 좋아하는 당신께, 이 영화를 드려요.">
                <Stepper step={step} onNext={onNext} onPrev={onPrev}>
                    <MovieGenre />
                    <MusicGenre />
                    <FilterMovie />
                    <LastLoading color="#304543" />
                </Stepper>
            </PageLayout>
        </div>
    );
};

export default Service;
