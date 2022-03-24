import { Icon } from 'antd'
import React from 'react'
import logo from '../../../public/images/tiki-logo.jpg'
import { ROUTES } from '../../constants'

const Title = ({ icon, children }) => <span><Icon type={icon} />{children}</span>

export default [
  {
    title: <img src={logo} alt="tiki_logo" style={{ height: '20px' }} />,
  },
  {
    title: <Title icon="laptop">Quản lý tồn kho</Title>,
    items: [
      {
        url: '/v2/#/checkstock/sku',
        title: 'Kiểm kê theo SKU',
      },
      {
        url: '/v2/#/checkstock/shelf',
        title: 'Kiểm kê theo kệ',
      },
      {
        url: '/v2/#/checkstock/report-by-sku',
        title: 'Báo cáo tồn theo SKU',
      },
    ],
  },
  {
    title: <Title icon="laptop">Nhập hàng vào kho</Title>,
    items: [
      {
        url: `/v2/#${ROUTES.RECEIVING_SEARCH_DOC}`,
        title: 'Nhận và kiểm hàng',
      },
      {
        url: `/v2/#${ROUTES.CLASSIFY}`,
        title: 'Phân loại hàng lỗi',
      },
      {
        url: '/#/receving/transfer_tote',
        title: 'Bàn giao tote Newpack',
      },
      {
        url: '/#/po/manage_po',
        title: 'Đặt hàng',
      },
      {
        url: `/v2/#${ROUTES.SUBMIT_DOC_PUT}`,
        title: 'Cất hàng từ phiếu',
      },
      {
        url: `/v2/#${ROUTES.PUT_AWAY}`,
        title: 'Trả lẻ không phiếu',
      },
      {
        url: `/v2/#${ROUTES.PRODUCT_DIMENSION}`,
        title: 'Cập nhật kích thước',
      },
      {
        url: '/#/product/update',
        title: 'Cập nhập IMEI/SN',
      },
      {
        url: '/#/product/expiryupdate',
        title: 'Cập nhật hạn sử dụng',
      },
    ],
  },
  {
    title: <Title icon="laptop">Sắp xếp hàng trong kho</Title>,
    items: [
      {
        url: '/#/refill_session/arrange_out',
        title: 'Pick kệ châm',
      },
      {
        url: '/v2/#/arrange/out',
        title: 'Lấy hàng khỏi kệ',
      },
      {
        url: '/v2/#/arrange/in',
        title: 'Cất hàng vào kệ',
      },
    ],
  },
  {
    title: <Title icon="laptop">Xử lý đơn hàng</Title>,
    items: [
      {
        url: '/#/submit_doc/pick',
        title: 'Lấy hàng',
      },
      {
        url: '/#/distribution',
        title: 'Phối hàng',
      },
    ],
  },
  {
    title: <Title icon="laptop">Quản lý ĐH</Title>,
    items: [
      {
        url: `/v2/#${ROUTES.IMPORT_EXTERNAL_ORDER}`,
        title: 'Import ĐH External',
      },
    ],
  },
  {
    title: <Title icon="laptop">Xuất hàng khỏi kho</Title>,
    items: [
      {
        url: `/v2/#${ROUTES.OUTBOUND_RETURN}`,
        title: 'Trả hàng cho seller',
      },
      {
        url: `/v2/#${ROUTES.OUTBOUND_RETURN_IMPORT}`,
        title: 'Import list SP cần trả hàng',
      },
    ],
  },
  {
    title: <Title icon="laptop">ORS</Title>,
    items: [
      {
        url: `/v2/#${ROUTES.ORS_DEBUG}`,
        title: 'Debug',
      },
      // {
      //   url: `/v2/#${ROUTES.ORS_CONFIG_BY_WAREHOUSE}`,
      //   title: 'Config theo kho',
      // },
      // {
      //   url: `/v2/#${ROUTES.ORS_CONFIG_BY_ROUTER}`,
      //   title: 'Config tuyến',
      // },
      // {
      //   url: `/v2/#${ROUTES.ORS_CONFIG_BY_DELIVERY_LEAD_TIME}`,
      //   title: 'Config delivery lead time',
      // },
    ],
  },
]
