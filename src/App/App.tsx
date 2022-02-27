import React, { useContext } from "react";

import RepoBranchesDrawer from "@components/RepoBranchesDrawer";
import GitHubStore from "@store/GitHubStore";
import { RepoItem } from "@store/GitHubStore/types";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import styles from "./App.module.scss";
import ReposPage from "./pages/ReposPage";
import ReposSearchPage from "./pages/ReposSearchPage";

type ReposContext = {
  list: RepoItem[];
  isLoading: boolean;
  load: (inputValue: string) => void;
}

const AppContext = React.createContext<ReposContext>({ list: [], isLoading: false, load: (inputValue: string) => { } });
export const useReposContext = () => useContext(AppContext);

const App: React.FC = () => {
  const [list, setRepoList] = React.useState<RepoItem[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const load = (inputValue: string): void => {
    if (inputValue.length > 0) {
      setIsLoading(true);
      const gitHubStore = new GitHubStore();
      gitHubStore.getOrganizationReposList({
        org: inputValue,
        query: {
          per_page: 5
        }
      }).then(result => {
        setRepoList(result.data);
        setIsLoading(false);
      })
    }
    else {
      setRepoList([]);
    }
  };

  return (
    <div className={styles.content}>
      <BrowserRouter>
        <Routes>
          <Route path="/repos/:id" element={
            <ReposPage />
          } />
          <Route path="/repos" element={
            <AppContext.Provider value={{
              list, isLoading, load
            }}>
              <ReposSearchPage />
            </AppContext.Provider>
          } />
          <Route
            path="*"
            element={<Navigate to="/repos" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
