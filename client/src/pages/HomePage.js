import React, { useState } from 'react'
import Layout from '../components/Layouts/Layout'
import { Form,Input, Modal, Select, message } from 'antd';
import axios from 'axios'
import Spinner from '../components/Spinner';

const HomePage = () => {

  const [showmodal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (value) => {
    try{
      const user = JSON.parse(localStorage.getItem('user'))
      setLoading(true)
      await axios.post('/transections/add-transection', {...value, userid: user._id})
      setLoading(false)
      message.success('Transection successfull')
      setShowModal(false)
    }catch(error) {
      setLoading(false)
      message.error('Failed to Add')
    }
  }

  return (
    <Layout>
      {loading && <Spinner />}
      <div className='filters'>
        <div>range filters</div>
        <div>
          <button className='btn btn-primary' onClick={() => setShowModal(true)}>Add new</button>
        </div>
      </div>
      <div className='content'>

      </div>
      <Modal title="Add Transection" open={showmodal} onCancel={() => setShowModal(false)} footer={false}>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label='Amount' name='amount'>
            <Input type='text' />
          </Form.Item>
          <Form.Item label='Type' name='type'>
            <Select>
              <Select.Option value='income'>Income</Select.Option>
              <Select.Option value='expense'>Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label='Category' name='category'>
            <Select>
              <Select.Option value='salary'>Salary</Select.Option>
              <Select.Option value='freelance'>Freelance</Select.Option>
              <Select.Option value='food'>Food</Select.Option>
              <Select.Option value='movie'>Movie</Select.Option>
              <Select.Option value='bills'>Bills</Select.Option>
              <Select.Option value='medical'>Medical</Select.Option>
              <Select.Option value='tax'>Tax</Select.Option>
              <Select.Option value='others'>Others</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label='Date' name='date'>
            <Input type='date' />
          </Form.Item>
          <Form.Item label='Refrence' name='refrence'>
            <Input type='text' />
          </Form.Item>
          <Form.Item label='Description' name='description'>
            <Input type='text' />
          </Form.Item>
          <div className='d-flex justify-content-end'>
            <button className='btn btn-primary'>Add </button>
          </div>
        </Form>
      </Modal>
    </Layout>
  )
}

export default HomePage
