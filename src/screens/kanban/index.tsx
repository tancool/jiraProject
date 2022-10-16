import styled from '@emotion/styled';
import { Spin } from 'antd';
import { ScreenContainer } from 'components/lib';
import React from 'react';
import { useDocumentTitle } from 'utils';
import { useKanbans } from 'utils/kanban';
import { useTasks } from 'utils/task';
import { CreateKanban } from './create-kanban';
import { KanbanColumn } from './kanban-column';
import { SearchPanel } from './search-panel';
import { TaskModal } from './task-modal';
import { useKanbanSearchParams, useProjectInUrl, useTaskSearchParams } from './util';

export const KanbanScreen = () => {
  useDocumentTitle('看板列表');
  const { data: currentProject } = useProjectInUrl();
  const { data: kanbans, isLoading: kanbanIsloading } = useKanbans(useKanbanSearchParams());
  const { isLoading: taskIsLoading } = useTasks(useTaskSearchParams());
  const isLoading = taskIsLoading || kanbanIsloading;
  return <ScreenContainer>
    <h1>{currentProject?.name}看板</h1>
    <SearchPanel />
    {isLoading ? <Spin size={'large'} /> : <ColumnsContainer>
      {
        kanbans?.map((kanban) => <KanbanColumn key={kanban.id} kanban={kanban} />)
      }
    <CreateKanban />
    </ColumnsContainer>}
    <TaskModal/>
  </ScreenContainer>
};
export const ColumnsContainer = styled.div`
display: flex;
overflow-x: scroll;
flex: 1;
`