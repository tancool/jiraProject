import React, { useState } from 'react'
import { Row, ScreenContainer } from 'components/lib'
import { useProjectInUrl } from 'screens/kanban/util';
import { useDeleteEpic, useEpics } from './../../utils/epic';
import { useEpicSearchParams, useEpicsQueryKey } from './util';
import { List, Button, Modal } from 'antd';
import dayjs from 'dayjs';
import { useTasks } from 'utils/task';
import { Link } from 'react-router-dom';
import { Epic } from 'types/epic';
import { CraeteEpic } from './create-epic';

export const EpicScreen = () => {
  const { data: currentProject } = useProjectInUrl();
  const { data: epics } = useEpics(useEpicSearchParams());
  const { data: tasks } = useTasks({ projectId: currentProject?.id });
  const { mutate: deleteEpic } = useDeleteEpic(useEpicsQueryKey());
  const [epicCreateOpen, setEpicCreateOpen] = useState(false);

  const confirmDeleteEpic = (epic: Epic) => {
    Modal.confirm({
      title: `确定删除项目组: ${epic.name}`,
      content: '点击确定删除',
      okText: '确定',
      onOk() {
        deleteEpic({ id: epic.id })
      }
    })
  }
  return <ScreenContainer>
    <Row between={true}>
      <h1>{currentProject?.name}任务组</h1>
      <Button type={'link'} onClick={() => setEpicCreateOpen(true)}>创建任务组</Button>
    </Row>
    
    {/* bugfix: 这里的高度应该是自适应的 */}
    <List
      style={{ overflowY: 'scroll',height:'1000px'}}
      dataSource={epics}
      itemLayout={'vertical'}
      renderItem={epic => <List.Item>
        <List.Item.Meta
          title={<Row between={true}>
            <span>{epic.name}</span>
            <Button type={'link'} onClick={() => confirmDeleteEpic(epic)}>删除</Button>
          </Row>}
          description={
            <div>
              <div>开始时间: {dayjs(epic.start).format('YYYY-MM-DD')}</div>
              <div>结束时间: {dayjs(epic.end).format('YYYY-MM-DD')}</div>
            </div>
          }
        />
        <div>
          {tasks?.filter(task => task.epicId === epic.id).map(task =>
            <div>
              <Link
                key={task.id}
                to={`/projects/${currentProject?.id}/kanban?editingTaskId=${task.id}`}>
                {task.name}
              </Link>
            </div>)
          }
        </div>
      </List.Item>} />
    <CraeteEpic onClose={() => setEpicCreateOpen(false)} visible={epicCreateOpen} />
  </ScreenContainer>
}