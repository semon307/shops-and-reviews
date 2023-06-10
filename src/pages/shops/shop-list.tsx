import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  Stack,
  Typography,
  Pagination,
  Button,
  TextField,
  Skeleton
} from '@mui/material';
import React, { FC, useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { ArrowDown } from '../../components/icons/arrow-down';
import { Rating } from '../../components/rating';
import { ShopsState, setShopsTC } from '../../redux/shops-reducer';
import { AppRootStateType, useTypedDispatch } from '../../redux/store';
import { ShopsFilters } from '../../redux/types/shop/shop-filters';
import { buildQueryString } from '../../utils/build-query-string';
import { ShopPreview } from './shop-preview';

export const ShopList: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<ShopsFilters>(
    {
      searchTerm: searchParams.get('searchTerm') || ' ',
      page: Number(searchParams.get('page')),
    }
  );

  const currentSearchKey = buildQueryString(filters);

  const [searchQuery, setSearchQuery] = useState(searchParams.get('searchTerm') || '');
  const shopsState = useSelector<AppRootStateType, ShopsState>((state) => state.shops);
  const dispatch = useTypedDispatch();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!shopsState.shopsRequests[currentSearchKey] && !isFirstRender.current) {
      dispatch(setShopsTC(filters));
    }
    isFirstRender.current = false;
  }, [filters.page, filters.searchTerm]);

  useEffect(() => {
    setSearchParams({
      ...filters,
      page: String(filters.page),
    });
  }, [filters]);

  const setPage = (newPage: number) => {
    setFilters((state) => ({ ...state, page: newPage }));
  };

  const handleSetSearchTerm = () => {
    setFilters({ page: 1, searchTerm: searchQuery });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSetSearchTerm();
    }
  };

  return (
    <Stack spacing={2} width={'60vw'}>
      <Card sx={{ padding: 2, display: 'flex', justifyContent: 'center' }}>
        <Stack direction={'row'} spacing={2}>
          <TextField
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.currentTarget.value)}
            onKeyDown={handleKeyDown}
            size={'small'}
          />
          <Button onClick={handleSetSearchTerm} size={'small'} variant={'contained'}>Search!</Button>
        </Stack>
      </Card>
      {shopsState.isLoading && (
        <>
          {Array.from({ length: 10 }, (_, index) => (<Skeleton key={index} height={80}/>))}
        </>
      )}
      {shopsState.error && <Card sx={{ padding: 2 }}>{shopsState.error}</Card>}
      {shopsState.shopsRequests[currentSearchKey]?.length
        ? (
          <>
            {
              shopsState.shopsRequests[currentSearchKey]?.map((shop) => (
                <Accordion
                  TransitionProps={{ unmountOnExit: true }}
                  title={shop.shopName}
                  key={shop.tsID}
                >
                  <AccordionSummary expandIcon={<ArrowDown/>}>
                    <Stack spacing={2} direction={'row'}>
                      <Typography>{shop.shopName}</Typography>
                      <Rating rating={shop.averageRating}/>
                    </Stack>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ShopPreview tsId={shop.tsID}/>
                  </AccordionDetails>
                </Accordion>
              ))
            }
          </>
        )
        : !shopsState.isLoading && (
          <Card sx={{ minHeight: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography>Nothing found:( Type something!</Typography>
          </Card>
        )
      }
      <Card sx={{ padding: 2, display: 'flex', justifyContent: 'center' }}>
        <Pagination
          onChange={(event, value) => setPage(value)}
          page={filters.page}
          count={shopsState.totalPageCount[String(filters.searchTerm)]}
          color={'primary'}
        />
      </Card>
    </Stack>
  );
};
