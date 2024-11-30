import MoviesPage from "./Movies"
import MoviesPaginated from "./MoviesPaginated"
import PersonalPage from "./personalPage"

const UsersPage = () => {
    return (
    <div className="flex flex-col gap-6">
        <PersonalPage />
        {/* <MoviesPage /> */}
        {/* <MoviesPaginated /> */}
    </div>
    )
}

export default UsersPage