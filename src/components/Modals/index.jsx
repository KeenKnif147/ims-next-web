import React from 'react'
import { useSelector } from 'react-redux'
import { DIALOG_NAMES } from '../../constants'
import ModalCompleteClassify from '../../features/classify/ModalComplete'
import ModalUpdateExpiryDateClassify from '../../features/classify/ModalExpiryDate'
import ModalInputImeiSn from '../../features/classify/ModalInputImeiSn'
import ModalUpdateExpiryDatePutAway from '../../features/putaway/ModalExpiryDate'
import ModalProductOnShelf from '../../features/putaway/ModalProductOnShelf'
import ModalUploadDimension from '../../pages/ProductDimension/modal/ModalUploadDimension'
import ModalAddDamagedTote from '../../pages/ReceivingPicking/ModalAddDamagedTote'
import ModalAddPo from '../../pages/ReceivingPicking/ModalAddPo'
import ModalBoxQuantity from '../../pages/ReceivingPicking/ModalBoxQuantity'
import ModalCancelReceive from '../../pages/ReceivingPicking/ModalCancelReceive'
import ModalChangeImeiSn from '../../pages/ReceivingPicking/ModalChangeImeiSn'
import ModalChangeTote from '../../pages/ReceivingPicking/ModalChangeTote'
import ModalChangeUser from '../../pages/ReceivingPicking/ModalChangeUser'
import ModalImeiSn from '../../pages/ReceivingPicking/ModalImeiSn'
import ModalListDamagedProducts from '../../pages/ReceivingPicking/ModalListDamagedProducts'
import ModalPrintBarcode from '../../pages/ReceivingPicking/ModalPrintBarcode'
import ModalPrintTote from '../../pages/ReceivingPicking/ModalPrintTote'
import ModalReceive from '../../pages/ReceivingPicking/ModalReceive'
import ModalReceiveDamagedProducts from '../../pages/ReceivingPicking/ModalReceiveDamagedProducts'
import ModalReceiveWrongQty from '../../pages/ReceivingPicking/ModalReceiveWrongQty'
import ModalRequirePass from '../../pages/ReceivingPicking/ModalRequirePass'
import ModalRescan from '../../pages/ReceivingPicking/ModalRescan'
import ModalUpdateDimension from '../../pages/ReceivingPicking/ModalUpdateDimension'
import ModalUpdateExpiryDate from '../../pages/ReceivingPicking/ModalUpdateExpiryDate'
import ModalUpdateMincode from '../../pages/ReceivingPicking/ModalUpdateMincode'
import ModalScanSerial from '../../pages/SubmitDocPut/modal/ModalScanSerial'
import ModalUpdateExpiryDateSubmitDoc from '../../pages/SubmitDocPut/modal/ModalUpdateExpiryDate'
import ModalInputQty from '../ModalInputQty'

const {
  IMEI_SN_DETAIL,
  CHANGE_USER,
  ADD_PO,
  RECEIVE_PO,
  CHANGE_TOTE,
  PRINT_TOTE,
  CHANGE_IMEI_SN,
  PRINT_BARCODE,
  RESCAN,
  UPDATE_EXPIRY_DATE,
  UPDATE_DIMENSION,
  REQUIRE_PASS,
  UPDATE_MINCODE,
  CANCEL_RECEIVE,
  RECEIVE_WRONG_QTY,
  INPUT_QTY,
  SUBMIT_DOC_SCAN_SERIAL,
  SUBMIT_DOC_UPDATE_EXPIRY_DATE,
  PRODUCT_DIMENSION_UPLOAD,
  RECEIVING_PICKING_LIST_DAMAGED_PRODUCTS,
  RECEIVING_PICKING_RECEIVE_DAMAGED_PRODUCTS,
  PRODUCT_ON_SHELF,
  PUT_AWAY_EXPIRY_DATE,
  RECEIVING_PICKING_ADD_DAMAGED_TOTE,
  CLASSIFY_EXPIRY_DATE,
  INPUT_IMEI_SN,
  CLASSIFY_COMPLETE,
  INPUT_BOX_QUANTITY,
} = DIALOG_NAMES

const modalMapping = {
  [IMEI_SN_DETAIL]: ModalImeiSn,
  [CHANGE_USER]: ModalChangeUser,
  [ADD_PO]: ModalAddPo,
  [RECEIVE_PO]: ModalReceive,
  [CHANGE_TOTE]: ModalChangeTote,
  [PRINT_TOTE]: ModalPrintTote,
  [CHANGE_IMEI_SN]: ModalChangeImeiSn,
  [PRINT_BARCODE]: ModalPrintBarcode,
  [RESCAN]: ModalRescan,
  [UPDATE_EXPIRY_DATE]: ModalUpdateExpiryDate,
  [UPDATE_DIMENSION]: ModalUpdateDimension,
  [REQUIRE_PASS]: ModalRequirePass,
  [UPDATE_MINCODE]: ModalUpdateMincode,
  [CANCEL_RECEIVE]: ModalCancelReceive,
  [RECEIVE_WRONG_QTY]: ModalReceiveWrongQty,
  [INPUT_QTY]: ModalInputQty,
  [SUBMIT_DOC_SCAN_SERIAL]: ModalScanSerial,
  [SUBMIT_DOC_UPDATE_EXPIRY_DATE]: ModalUpdateExpiryDateSubmitDoc,
  [PRODUCT_DIMENSION_UPLOAD]: ModalUploadDimension,
  [RECEIVING_PICKING_LIST_DAMAGED_PRODUCTS]: ModalListDamagedProducts,
  [RECEIVING_PICKING_ADD_DAMAGED_TOTE]: ModalAddDamagedTote,
  [RECEIVING_PICKING_RECEIVE_DAMAGED_PRODUCTS]: ModalReceiveDamagedProducts,
  [PRODUCT_ON_SHELF]: ModalProductOnShelf,
  [PUT_AWAY_EXPIRY_DATE]: ModalUpdateExpiryDatePutAway,
  [CLASSIFY_EXPIRY_DATE]: ModalUpdateExpiryDateClassify,
  [INPUT_IMEI_SN]: ModalInputImeiSn,
  [CLASSIFY_COMPLETE]: ModalCompleteClassify,
  [INPUT_BOX_QUANTITY]: ModalBoxQuantity,
}

const Modals = () => {
  const openModals = useSelector(state => state.ui.dialogs)

  const renderedModals = openModals.map((modal, index) => {
    const { name, props } = modal
    const ModalComponent = modalMapping[name]

    if (!ModalComponent) throw new Error(`No component found for modal "${name}"`)

    return <ModalComponent {...props} key={name + index} />
  })

  return <span>{renderedModals}</span>
}

export default React.memo(Modals)
