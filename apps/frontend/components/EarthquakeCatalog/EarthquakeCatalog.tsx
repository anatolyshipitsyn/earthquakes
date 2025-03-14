'use client';

import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { fetchEarthquakeList } from '@/app/services/fetchEarthquakeList';
import { Earthquake } from 'graphql-common/src/types';
import { useCallback, useRef, useState } from 'react';
import { UpdateForm } from '@/components/EarthquakeCatalog/components/UpdateForm';
import { Button } from 'antd';
import { useMutation } from '@apollo/client';
import {
  ADD_EARTHQUAKE,
  DELETE_EARTHQUAKE,
  UPDATE_EARTHQUAKE,
} from '@/app/graphql/mutations';
import { GET_EARTHQUAKES } from '@/app/graphql/queries';

export const EarthquakeCatalog = () => {
  const actionRef = useRef<ActionType>();
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<Earthquake>();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20,
    hideOnSinglePage: true,
  });

  const [addEarthquake] = useMutation(ADD_EARTHQUAKE, {
    refetchQueries: [
      {
        query: GET_EARTHQUAKES,
        variables: {
          current: pagination.current,
          pageSize: pagination.pageSize,
        },
      },
    ],
    awaitRefetchQueries: true,
    onCompleted: () => {
      handleUpdateModalOpen(false);
      setCurrentRow(undefined);
      actionRef.current?.reload(); // Reload data or perform additional actions here
    },
  });

  const [updateEarthquake, { loading, error }] = useMutation(
    UPDATE_EARTHQUAKE,
    {
      refetchQueries: [
        {
          query: GET_EARTHQUAKES,
          variables: {
            current: pagination.current,
            pageSize: pagination.pageSize,
          },
        },
      ],
      awaitRefetchQueries: true,
      onCompleted: () => {
        handleUpdateModalOpen(false);
        setCurrentRow(undefined);
        actionRef.current?.reload(); // Reload data or perform additional actions here
      },
    }
  );

  const [deleteEarthquake] = useMutation(DELETE_EARTHQUAKE, {
    refetchQueries: [
      {
        query: GET_EARTHQUAKES,
        variables: {
          current: pagination.current,
          pageSize: pagination.pageSize,
        },
      },
    ],
    awaitRefetchQueries: true,
    onCompleted: () => {
      handleUpdateModalOpen(false);
      setCurrentRow(undefined);
      actionRef.current?.reload();
    },
  });

  const handleDelete = async (id: number): Promise<void> => {
    if (confirm('Are you sure you want to delete this earthquake?')) {
      await deleteEarthquake({ variables: { id } });
    }
  };

  const columns: ProColumns<Earthquake, string>[] = [
    {
      title: '#',
      valueType: 'index',
      render: (_dom: unknown, _item: unknown, index: number) =>
        (pagination.current - 1) * pagination.pageSize + index + 1,
      width: 48,
    },
    { title: 'Location', dataIndex: 'location' },
    {
      title: 'Magnitude',
      dataIndex: 'magnitude',
      align: 'right',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      align: 'right',
      render: (_: unknown, record: Earthquake) => {
        const date = new Date(Number(record.date));

        return new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).format(date);
      },
    },
    {
      title: 'Edit',
      dataIndex: 'option',
      valueType: 'option',
      width: 100,
      render: (_: unknown, record: Earthquake) => (
        <a
          key="config"
          onClick={() => {
            handleUpdateModalOpen(true);
            setCurrentRow(record);
          }}
        >
          Edit
        </a>
      ),
    },
  ];

  const handleTableChange = (page: { current?: number; pageSize?: number }) => {
    setPagination((prev) => ({
      ...prev,
      current: page.pageSize !== prev.pageSize ? 1 : page.current || 1,
      pageSize: page.pageSize || prev.pageSize,
    }));
  };

  const handleSubmit = async (data: Partial<Earthquake>) => {
    try {
      if (!currentRow?.id) {
        await addEarthquake({
          variables: {
            data: {
              location: data.location,
              magnitude: data.magnitude,
              date: new Date(`${data.date}`).getTime().toString(),
            },
          },
        });
      } else {
        await updateEarthquake({
          variables: {
            id: currentRow?.id,
            data: {
              location: data.location,
              magnitude: data.magnitude,
              date: new Date(`${data.date}`).getTime().toString(),
            },
          },
        });
      }
    } catch (error) {
      throw error;
    }
  };

  const handleCancel = useCallback(() => {
    handleUpdateModalOpen(false);
    setCurrentRow(undefined);
  }, []);

  const handleAddNew = useCallback(() => {
    setCurrentRow(undefined);
    handleUpdateModalOpen(true);
  }, []);

  return (
    <>
      <ProTable
        actionRef={actionRef}
        rowKey="id"
        columns={columns}
        columnsState={{
          persistenceKey: `earthquake-catalog-table`,
          persistenceType: 'localStorage',
        }}
        request={(params: { pageSize?: number; current?: number }) =>
          fetchEarthquakeList(params)
        }
        search={false}
        onChange={handleTableChange}
        toolBarRender={() => [
          <Button key="add" type="primary" onClick={handleAddNew}>
            Add New
          </Button>,
        ]}
      />
      <UpdateForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        onDelete={handleDelete}
        updateModalOpen={updateModalOpen}
        values={currentRow}
      />
      {loading && <p>Updating...</p>}
      {error && <p>Error updating earthquake</p>}
    </>
  );
};
