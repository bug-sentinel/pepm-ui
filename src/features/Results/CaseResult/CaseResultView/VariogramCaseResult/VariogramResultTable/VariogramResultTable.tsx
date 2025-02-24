/* eslint-disable max-lines-per-function */
import { Typography } from '@equinor/eds-core-react';
import { EdsDataGrid } from '@equinor/eds-data-grid-react';
import { useState } from 'react';
import { GetVariogramResultsDto } from '../../../../../../api/generated';
import { ImageResult } from '../ImageResult/ImageResult';
import * as Styled from './VariogramResultTable.styled';
import { usePepmContextStore } from '../../../../../../hooks/GlobalState';

interface ResultObjectType {
  variogramResultId: string;
  computeCaseId: string;
  method: string;
  parameter: string;
  archelFilter: string;
  modelArea: string;
  variogramModel: string;
  quality: string | number;
}

const NumberOfDecimals = 3;

export const VariogramResultTable = ({
  resultList,
}: {
  resultList: GetVariogramResultsDto[];
}) => {
  const { computeCases } = usePepmContextStore();
  const [open, setOpen] = useState(false);
  const [imageId, setImageId] = useState('');

  const roundResultString = (value: number) => {
    if (value) {
      return value.toFixed(NumberOfDecimals);
    } else return value;
  };

  const resultElementsList: ResultObjectType[] = resultList.map((e) => {
    const method = computeCases.filter(
      (c) => c.computeCaseId === e.computeCaseId,
    )[0]?.computeMethod?.name;
    let parameter = '';
    if (method === 'Indicator') {
      parameter = e.indicator ? e.indicator : '';
    } else if (method === 'Net-To-Gross') {
      parameter = e.customIndicator ? e.customIndicator : '';
    } else if (method === 'ContiniousParameter') {
      parameter = e.attribute ? e.attribute : '';
    }

    const modelArea = computeCases.filter(
      (c) => c.computeCaseId === e.computeCaseId,
    )[0]?.modelArea;

    const element: ResultObjectType = {
      variogramResultId: e.variogramResultId,
      computeCaseId: e.computeCaseId,
      method: method ? method : '',
      parameter: parameter,
      archelFilter: e.archelFilter ? e.archelFilter : '',
      modelArea: modelArea ? modelArea.name : '',
      variogramModel: e.family ? e.family : '',
      quality: roundResultString(e.quality)
        ? roundResultString(e.quality)
        : e.quality,
    };
    return element;
  });

  const handleImageDialog = (id: string, variogramResultId: string) => {
    const computeCaseResults = resultList.filter((e) => e.computeCaseId === id);
    const resultFile = computeCaseResults
      .find((r) => r.variogramResultId === variogramResultId)!
      .variogramResultFiles.find((x) =>
        x.fileName.includes('variogram_slices_'),
      );

    const imageId = resultFile ? resultFile.variogramResultFileId : '';
    setImageId(imageId);
    setOpen(!open);
  };

  return (
    <>
      <Styled.Table>
        <EdsDataGrid
          enableSorting
          enableColumnFiltering
          enablePagination
          emptyMessage="No results to show"
          columnResizeMode="onChange"
          rows={resultElementsList}
          pageSize={20}
          columns={[
            {
              accessorKey: 'method',
              header: () => <Styled.Column>Compute method</Styled.Column>,
              id: 'method',
            },
            {
              accessorKey: 'parameter',
              header: () => <Styled.Column>Parameter</Styled.Column>,
              id: 'parameter',
            },
            {
              accessorKey: 'archelFilter',
              header: () => <Styled.Column>Archel Filter</Styled.Column>,
              id: 'archelFilter',
            },
            {
              accessorKey: 'modelArea',
              header: () => <Styled.Column>Model Area</Styled.Column>,
              id: 'modelArea',
            },
            {
              accessorKey: 'variogramModel',
              header: () => <Styled.Column>Variogram model</Styled.Column>,
              id: 'variogramModel',
              cell: ({ row }) => (
                <div>
                  <Typography
                    onClick={() =>
                      handleImageDialog(
                        row.original.computeCaseId,
                        row.original.variogramResultId,
                      )
                    }
                    link
                  >
                    {row.original.variogramModel}
                  </Typography>
                </div>
              ),
            },
            {
              accessorKey: 'quality',
              header: () => <Styled.Column>Quality factor</Styled.Column>,
              id: 'quality',
              enableColumnFilter: false,
              cell: ({ row }) => (
                <Styled.Quality>{row.original.quality}</Styled.Quality>
              ),
            },
          ]}
        />
      </Styled.Table>
      <ImageResult
        imageId={imageId}
        open={open}
        setOpen={setOpen}
      ></ImageResult>
    </>
  );
};
