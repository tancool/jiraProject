import React from 'react';
import { Drawer, Button } from 'antd';

export const ProjectModal = (props: { projectModalOpen: boolean, onClose: () => void }) => {
  return <Drawer
    visible={props.projectModalOpen}
    width={'100%'}
    onClose={props.onClose}
  >
    <h1>Project Modal</h1>
    <Button onClick={props.onClose}>关闭</Button>
  </Drawer>
}