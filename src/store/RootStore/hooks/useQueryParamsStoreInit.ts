import * as Router from "react-router-dom";

import rootStore from "../instance";

export const useQueryParamsStoreInit = (): void => {
    const { search } = Router.useLocation();
    const navigate  =  Router.useNavigate();

    rootStore.query.setHistory(search, navigate);

    rootStore.query.setSearch(search);
}