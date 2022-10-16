import React from 'react';
import { Kanban } from 'types/kanban';
import { useTasks } from 'utils/task';
import { useTaskTypes } from 'utils/task-type';
import { useTaskSearchParams, useTaskModal } from './util';
import taskIcon from 'assets/task.svg';
import bugIcon from 'assets/bug.svg';
import styled from '@emotion/styled';
import { Card } from 'antd';
import { CreateTask } from './create-task';

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes();
  const name = taskTypes?.find(item => item.id === id)?.name;
  if (!name) {
    return null;
  }

  return <img src={name === 'task' ? taskIcon : bugIcon} alt='img' />
}

export const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
  const { data: allTasks } = useTasks(useTaskSearchParams());
  const tasks = allTasks?.filter(task => task.kanbanId === kanban.id);
  const { startEdit } = useTaskModal();

  return <Container>
    <h2>{kanban.name}</h2>
    <TaskContainer>
      {tasks?.map(task => (
        <Card
          style={{ marginBottom: '0.5rem', cursor: 'pointer' }}
          key={task.id}
          onClick={() => startEdit(task.id)}
        >
          <div>
            {task.name}
          </div>
          <TaskTypeIcon id={task.typeId} />
        </Card>
      ))}
      <CreateTask kanbanId={kanban.id} />
    </TaskContainer>
  </Container >
}

export const Container = styled.div`
min-width: 27rem;
border-radius:6px;
background-color:rgb(244,245,247);
display:flex;
flex-direction: column;
padding:0.7rem 0.7rem 1rem;
margin-right: 1.5rem;
`

const TaskContainer = styled.div`
overflow: scroll;
flex: 1;
::-webkit-scrollbar{
  display: none;
}
`