import { Link } from "react-router-dom";
import s from "./NotFoundPage.module.css"

const NotFoundPage = () => {
  return (
    <div className={s.container}>
        <h1 className={s.error}>404. The page does not exist</h1>
        <Link to="/" className={s.goBack}>Go back to homepage</Link>
    </div>
  )
}

export default NotFoundPage;