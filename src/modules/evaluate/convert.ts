import Evaluate from "../decormModel/evaluate";
import Reply from "../decormModel/reply";
import { getSubItemsFrmArr, getNoReptItem, combine } from '../../modules/commontypes'

function getEvalLst(evalLst: Evaluate[]) {
  return getSubItemsFrmArr(
    evalLst,
    'evaluateid',
    'content',
    'evaluator',
    'isbn',
    'headportrai',
    'givealikenum',
    'evaluatedegree',
    'pubdate',
    'isanonymous'
  )
}

function getRplLst(evalReplyLst: Evaluate[]) {
  return getSubItemsFrmArr(evalReplyLst, 'replyid', 'replycontent', 'replydate', 'replyor', 'evalid')
}

type EvalKeysUnion = 'evaluateid' | 'content' | 'evaluator' | 'isbn' | 'headportrai' | 'givealikenum' | 'evaluatedegree' | 'pubdate' | 'isanonymous'
type EvalReplyLstUnion = EvalKeysUnion | 'replyLst'
type EvalReplyItem = Pick<Evaluate, EvalReplyLstUnion>
type EvalReplyLastLst = EvalReplyItem[]
type ReplyItem = Pick<Reply, 'evalid' | 'replyid' | 'replycontent' | 'replycontent' | 'replydate' | 'replyor'>
type ReplyList = ReplyItem[]
export default function convert(evalReplyLst: Evaluate[]) {
  // 1. 获取评论列表数组
  let evalLst = getEvalLst(evalReplyLst)
  // 2. 去重评论列表数组
  let noRepeatEvalLst = getNoReptItem(evalLst, 'evaluateid') // 去重数组
  let replyLst = getRplLst(evalReplyLst)
  const evalRplLastLst: EvalReplyLastLst = []
  noRepeatEvalLst.forEach(noRepeatEval => {
    const lastRplLst: ReplyList = []
    replyLst.forEach(reply => {
      if(noRepeatEval.evaluateid === reply.evalid) {
        lastRplLst.push(reply)
      }
    })
    const evalRplItemComb: EvalReplyItem = combine(noRepeatEval, { replyLst: lastRplLst})
    evalRplLastLst.push(evalRplItemComb)
  });
  return evalRplLastLst
}