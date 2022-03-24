const CPN_STATUS = {
  PACKING: 'dang_dong_goi',
}

const ERP_STATUS = {
  PICKING: 'Đang lấy hàng',
  WAIT_FOR_PRINT: 'Chờ in',
}

const NOTIFICATION_TYPES = {
  ERROR: 'error',
  SUCCESS: 'success',
  WARNING: 'warning',
  INFO: 'info',
}

const PICKING_TYPE = {
  PRINT: 'in',
  INTERNAL: 'internal',
}

const PICKUP_TYPE = {
  DROPSHIP: 'dropship',
  MANUAL: 'manual',
}

const SERVICE_STATUS = {
  WAITING: 'cho_hang',
  ARRIVED: 'da_den_kho',
  RECEIVED: 'da_nhan_hang_ncc',
  CHECKING: 'dang_kiem',
}

export const PICKING_CLASSIFY_TYPES = {
  PICK: 'pick',
  BUFFER: 'buffer',
}

export const PICKING_DAMAGED_TYPES = {
  PHYSICAL: 'physical',
  EXPIRED: 'expired',
}

const DIALOG_NAMES = {
  IMEI_SN_DETAIL: 'IMEI_SN_DETAIL',
  CHANGE_USER: 'CHANGE_USER',
  ADD_PO: 'ADD_PO',
  RECEIVE_PO: 'RECEIVE_PO',
  CHANGE_TOTE: 'CHANGE_TOTE',
  PRINT_TOTE: 'PRINT_TOTE',
  CHANGE_IMEI_SN: 'CHANGE_IMEI_SN',
  PRINT_BARCODE: 'PRINT_BARCODE',
  RESCAN: 'RESCAN',
  UPDATE_EXPIRY_DATE: 'UPDATE_EXPIRY_DATE',
  UPDATE_DIMENSION: 'UPDATE_DIMENSION',
  REQUIRE_PASS: 'REQUIRE_PASS',
  UPDATE_MINCODE: 'UPDATE_MINCODE',
  CANCEL_RECEIVE: 'CANCEL_RECEIVE',
  RECEIVE_WRONG_QTY: 'RECEIVE_WRONG_QTY',
  INPUT_QTY: 'INPUT_QTY',
  SUBMIT_DOC_UPDATE_EXPIRY_DATE: 'SUBMIT_DOC_UPDATE_EXPIRY_DATE',
  SUBMIT_DOC_SCAN_SERIAL: 'SUBMIT_DOC_SCAN_SERIAL',
  PRODUCT_DIMENSION_UPLOAD: 'PRODUCT_DIMENSION_UPLOAD',
  RECEIVING_PICKING_LIST_DAMAGED_PRODUCTS: 'RECEIVING_PICKING_LIST_DAMAGED_PRODUCTS',
  RECEIVING_PICKING_ADD_DAMAGED_TOTE: 'RECEIVING_PICKING_ADD_DAMAGED_TOTE',
  RECEIVING_PICKING_RECEIVE_DAMAGED_PRODUCTS: 'RECEIVING_PICKING_RECEIVE_DAMAGED_PRODUCTS',
  PRODUCT_ON_SHELF: 'PRODUCT_ON_SHELF',
  PUT_AWAY_EXPIRY_DATE: 'PUT_AWAY_EXPIRY_DATE',
  CLASSIFY_EXPIRY_DATE: 'CLASSIFY_EXPIRY_DATE',
  CLASSIFY_COMPLETE: 'CLASSIFY_COMPLETE',
  INPUT_IMEI_SN: 'INPUT_IMEI_SN',
  INPUT_BOX_QUANTITY: 'INPUT_BOX_QUANTITY',
}

const CHECK_STOCK_MODES = {
  SKU: 'sku',
  SHELF: 'shelf',
}

export const STAMP_SIZE = {
  SMALL: 'small', // barcode
  MEDIUM: 'medium', // ST
}

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SUBMIT_DOC_INFO: '/submit-doc/info',
  ORS_DEBUG: '/ors/debug',
  ORS_CONFIG_BY_WAREHOUSE: '/ors/config-by-warehouse',
  ORS_CONFIG_BY_ROUTER: '/ors/config-by-router',
  ORS_CONFIG_BY_DELIVERY_LEAD_TIME: '/ors/config-by-delivery-lead-time',
  SUBMIT_DOC_PUT: '/submit-doc/put',
  RECEIVING_SEARCH_DOC: '/receiving/search-doc',
  RECEIVING_PICKING: '/receiving/picking/:pickingId',
  CHECK_STOCK: '/checkstock/:mode',
  OUTBOUND_RETURN: '/outbound/return',
  PRODUCT_DIMENSION: '/product/dimensioninfo',
  OUTBOUND_RETURN_IMPORT: '/outbound/return-import',
  ARRANGE: '/arrange/:mode',
  CLASSIFY: '/classify',
  PUT_AWAY: '/submit_shelf/stock_check_and_append',
  IMPORT_EXTERNAL_ORDER: '/om/import_external_order',
}

export const ORS = {
  QUERY_TYPES: {
    ORDER: 'orders',
    SESSION_ID: 'session_id',
  },
  PRIORITY_TYPES: {
    NORMAL: 'prioritize_normal',
    TIKINOW: 'prioritize_tikinow',
    SDND: 'prioritize_sdnd',
    TIKIPRO: 'prioritize_schedule',
  },
  PHRASES: {
    CREATE_ORDER: 'create_order',
    CHOOSE_ADDRESS: 'choose_address',
  },
}

export const CLASSIFY_TYPES = {
  DAMAGED: 'damaged_product',
  NEARLY_EXPIRED: 'nearly_expired',
  OUT_OF_DATE: 'out_of_date',
  DESTROY: 'destroy',
}

export const CLASSIFY_TYPES_TRANSLATE = {
  [CLASSIFY_TYPES.DAMAGED]: 'Hư hỏng',
  [CLASSIFY_TYPES.NEARLY_EXPIRED]: 'Cận date',
  [CLASSIFY_TYPES.OUT_OF_DATE]: 'Hết HSD',
  [CLASSIFY_TYPES.DESTROY]: 'Cần tiêu huỷ',
}

export const BPOR_STATES = {
  draft: 'Phác thảo',
  approved_1: 'Kiểm tra',
  approved_2: 'Chờ Duyệt',
  sent: 'Đã Email',
  confirmed: 'Chờ phê duyệt',
  approved: 'PO Đã Duyệt',
  except_picking: 'Lỗi Giao Nhận',
  except_invoice: 'Lỗi Hoá Đơn',
  done: 'Hoàn Tất',
  cancel: 'Đã Huỷ',
}

export const OUT_STATES = {
  draft: 'Phác thảo',
  confirmed: 'Chờ hàng',
  assigned: 'Chờ nhập',
  done: 'Đã nhận',
  cancel: 'Đã huỷ',
}

export const SKU_STATES = OUT_STATES

export const ARRANGE_MODES = {
  IN: 'arrange_in',
  OUT: 'arrange_out',
}

export {
  CPN_STATUS,
  ERP_STATUS,
  NOTIFICATION_TYPES,
  PICKING_TYPE,
  SERVICE_STATUS,
  DIALOG_NAMES,
  CHECK_STOCK_MODES,
  PICKUP_TYPE,
}
