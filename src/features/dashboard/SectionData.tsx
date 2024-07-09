import { Col, Form, Input, Pagination, Row, Select, Spin, Table } from "antd";
import useGetList from "./hooks/useGetList";

const { Search } = Input;
const { Option } = Select;

export default function SectionData({ initialData }: { initialData?: any }) {
  const [form] = Form.useForm();

  const {
		fetchQuery,
		onChangePage,
		getCurrentPage,
		handleOnSearch,
		getDefaultValueFilter,
		dataTable,
	} = useGetList(initialData);

	const { data, isLoading, isError, error }: any = fetchQuery;
  
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'First Name',
      dataIndex: 'first_name',
      key: 'first_name',
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      key: 'last_name',
    },
  ];

  const renderPagination = (count: any) => {
		return (
			<Pagination
				showSizeChanger={false}
				onChange={(page: any) => {
					onChangePage(page);
				}}
				defaultCurrent={+getCurrentPage() || 1}
				total={count || 0}
				// pageSizeOptions={[
				// 	2
				// ]}
			/>
		);
	};
	if (isError) {
		return (
			<Row align="middle" justify="center">
				<p>{error.toString()}</p>
			</Row>
		);
	}
	if (isLoading)
		return (
			<Row align="middle" justify="center">
				<Spin />
			</Row>
		);

  return (
    <>
			<Form
				name="search-form"
				form={form}
				autoComplete="off"
				style={{
					marginBottom: '1.25rem',
				}}
			>
				<Row style={{ width: '100%' }}>
					<Col span={4}>
						<Form.Item name="filter">
							<Select
								mode="multiple"
								placeholder="Filter by211111..."
								defaultValue={getDefaultValueFilter().filter?.split(',')}
							>
								<Option value="name">Name</Option>
								<Option value="url">URL</Option>
							</Select>
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name="search">
							<Search
								defaultValue={getDefaultValueFilter().search}
								enterButton={'search'}
								placeholder={`${'search'}...`}
								onSearch={() => handleOnSearch(form)}
							/>
						</Form.Item>
					</Col>
				</Row>
			</Form>
			<Row style={{ marginBottom: '1.25rem' }}>
				<Col span={24}>
					<Table
						bordered
						columns={columns}
						dataSource={dataTable}
						pagination={false}
					/>
				</Col>
			</Row>
			<Row align="middle" justify="end">
				<Col>{renderPagination(data?.total)}</Col>
			</Row>
		</>
  );
}