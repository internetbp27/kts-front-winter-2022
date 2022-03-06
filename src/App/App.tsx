import React, { useContext } from "react";

import RepoBranchesDrawer from "@components/RepoBranchesDrawer";
import GitHubStore from "@store/GitHubStore";
import { RepoItem } from "@store/GitHubStore/types";
import ReposListStore from "@store/ReposListStore";
import { useQueryParamsStoreInit } from "@store/RootStore/hooks/useQueryParamsStoreInit";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import styles from "./App.module.scss";
import ReposPage from "./pages/RepoPage";
import ReposSearchPage from "./pages/ReposSearchPage";


const App: React.FC = () => { 

  return (
    <div className={styles.content}>
      <BrowserRouter>
        <Routes>
          <Route path="/repos/:id" element={
            <ReposPage />
          } />
          <Route path="/repos" element={
            <ReposSearchPage />
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
