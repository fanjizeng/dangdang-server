import { secCtgyModel } from './SecCtgyModel'
import { thirdCtgyModel } from './ThirdCtgyModel'
import { firstModel } from './index'
import Ctgys from '../../../modules/decormModel/ctgys'
secCtgyModel.hasMany(thirdCtgyModel, { as: 'thirdctgy', foreignKey: 'secctgyid' })
thirdCtgyModel.belongsTo(secCtgyModel, { foreignKey: 'secctgyid', targetKey: 'secondctgyid' })

async function findSecThrdCtgysByFstCtgyId(firstctgyId: number) {
  const result = await secCtgyModel.findAll({
    where: {
      firstctgyId
    },
    include: [
      {
        model: thirdCtgyModel,
        as: 'thirdctgy'
      }
    ]
  })
  return result
}
async function findThirdCtgyBySecId(secctgyId: number) {
  const result = await thirdCtgyModel.findAll({
    attributes: [
      'secctgyid',
      'thirdctgyid',
      'thirdctgyname'
    ],
    where: {
      secctgyId
    }
  })
  return result
}
async function findAllFirstCtgy() {
  const result = await Ctgys.findAll({
    raw: true
  })
  return result
}

export {
  findSecThrdCtgysByFstCtgyId,
  findThirdCtgyBySecId,
  findAllFirstCtgy
}