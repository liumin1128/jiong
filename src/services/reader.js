import request from '../utils/request';
// import db from 'localforage';

export function getList({ page = 1, pageSize = 30 }) {
  const offset = (page - 1) * pageSize;
  return request(`/jiong/m/jiong?offset=${offset}&order=created&math=0.3587659773203531`);
}

export function getDetail({ id }) {
  return request(`/jiong/index.php?r=show/getByGallery/&gid=${id}`);
}

