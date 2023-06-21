import axios from 'axios';
import { CommentType } from '../../types/farmsteadsTypes';
const sendComment = (id: number, comment: CommentType) =>
    axios<CommentType>({
        method: 'POST',
        url: `http://localhost:3002/farmsteads/${id}/comments`,
        data: comment,
    });

export default sendComment;
