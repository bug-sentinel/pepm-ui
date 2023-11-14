/* eslint-disable max-lines-per-function */
import { useMsal } from '@azure/msal-react';
import { Button, Chip, Scrim, SideSheet } from '@equinor/eds-core-react';
import { EdsDataGrid } from '@equinor/eds-data-grid-react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnalogueModelsService, OpenAPI } from '../api/generated';
import { useAccessToken } from '../hooks/useAccessToken';
import { AreaCoordinates } from './AreaCoordinates/AreaCoordinates';
import * as Styled from './Table.styled';

export const Table = ({ refetchKey }: { refetchKey: number }) => {
  const { instance, accounts } = useMsal();
  const token = useAccessToken(instance, accounts[0]);
  if (token) OpenAPI.TOKEN = token;
  const navigate = useNavigate();

  const [toggle, setToggle] = useState<boolean>(false);
  const [activeModel, setActiveModel] = useState<string>();
  const { isLoading, data } = useQuery({
    queryKey: ['analogue-models', refetchKey],
    queryFn: () => AnalogueModelsService.getApiAnalogueModels(),
    enabled: !!token,
  });

  if (isLoading || !data?.success) return <p>Loading...</p>;

  return (
    <Styled.StyledDiv>
      <EdsDataGrid
        enableSorting
        enablePagination
        emptyMessage="Empty :("
        rows={data.data}
        pageSize={5}
        columns={[
          {
            accessorKey: 'analogueModelId',
            header: 'Model ID',
            id: 'analogueModelId',
          },
          { accessorKey: 'name', header: 'Name', id: 'name' },
          {
            accessorKey: 'description',
            header: 'Description',
            id: 'description',
          },
          {
            accessorKey: 'isApproved',
            header: 'Result',
            cell: () => <Chip>{'Approved'}</Chip>,
          },
          {
            accessorKey: 'modified',
            header: 'Last Modified',
            cell: () => <div>{'<Last Modified>'}</div>,
          },
          {
            accessorKey: 'analogue',
            header: 'Analogue',
            cell: () => <div>{'<Analogue>'}</div>,
          },
          {
            accessorKey: 'formation',
            header: 'Formation',
            cell: () => <div>{'<Formation>'}</div>,
          },
          {
            accessorKey: 'field',
            header: 'Field',
            cell: () => <div>{'<Field>'}</div>,
          },
          {
            accessorKey: 'isProcessed',
            header: 'Status',
            id: 'isProcessed',
          },

          {
            accessorKey: 'navigate',
            cell: ({ row }) => (
              <Button
                onClick={() => {
                  navigate(`/model/${row.original.analogueModelId}/details`);
                }}
              >
                Go to model
              </Button>
            ),
            header: '',
            id: 'navigate',
          },
          {
            accessorKey: 'areas',
            cell: ({ row }) => (
              <Button
                onClick={() => {
                  setActiveModel(row.original.analogueModelId);
                  setToggle(!toggle);
                }}
              >
                Set Areas
              </Button>
            ),
            header: '',
            id: 'areas',
          },
        ]}
      />
      {activeModel && (
        <Scrim open={toggle}>
          <SideSheet open={toggle} onClose={() => setToggle(!toggle)}>
            <AreaCoordinates modelId={activeModel} />
          </SideSheet>
        </Scrim>
      )}
    </Styled.StyledDiv>
  );
};
