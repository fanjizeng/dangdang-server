import type Reply from '../decormModel/reply'
type ReplyRawKeys = 'evalid' | 'replycontent' |  'replydate' | 'strReplyDate' | 'replyor'
export type ReplyRaw = Pick<Reply, ReplyRawKeys>