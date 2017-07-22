package jdbc_mysql2;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import jdbc_mysql.DBUtil;

import org.junit.Test;

import emp.Emp;
import empDao.EmpDao;

public class JDBCTest {
	/**
	 * 写测试方法批量增加108个员工,每批增加50个
	 */
	@Test
	public void test(){
		Connection conn = null;
		try {
			conn = DBUtil.getConnection();
			conn.setAutoCommit(false);
			String sql = "insert into daoemp values(?,?,?,?)";
			PreparedStatement ps = conn.prepareStatement(sql);
			for(int i=1;i<=108;i++){
				ps.setInt(1, i);
				ps.setString(2,"小明"+i);
				ps.setString(3,"学生");
				ps.setDouble(4,1000);
				ps.addBatch();
				if(i%50==0){
					ps.executeBatch();
					ps.clearBatch();
				}
			}
			ps.executeBatch();
			conn.commit();
		} catch (SQLException e) {
			DBUtil.rollback(conn);
			e.printStackTrace();
			throw new RuntimeException("创建连接失败",e);
		}finally{
			DBUtil.close(conn);
		}
	}
	@Test
	//ok
	public void test2(){
		Connection conn = null;
		try {
			conn = DBUtil.getConnection();
			conn.setAutoCommit(false);
			String sql = "insert into dept(dname,loc) values(?,?)";
			String[] str ={"deptno"};
			PreparedStatement ps = conn.prepareStatement(sql,str);
			ps.setString(1, "jishu");
			ps.setString(2,"hz");
			ps.executeUpdate();
			ResultSet rs = ps.getGeneratedKeys();
			rs.next();
			int deptno = rs.getInt(1);
			System.out.println(deptno);
			
			String sql2 = "insert into emp values(?,?,?,?,?,?,?,?)";
			ps = conn.prepareStatement(sql2);
			ps.setInt(1,12121);
			ps.setString(2,"bob");
			ps.setString(3,"student");
			ps.setInt(4, 232323);
			ps.setDate(5,new Date(System.currentTimeMillis()));
			ps.setDouble(6, 10);
			ps.setDouble(7, 10);
			ps.setInt(8,deptno);
			ps.executeUpdate();
			conn.commit();
		} catch (SQLException e) {
			DBUtil.rollback(conn);
			System.out.println(e);
			throw new RuntimeException("连接失败",e);
		}finally{
			DBUtil.close(conn);
		}
	}
	//分页查询
	@Test
	public void test3(){
		//查询的 page = 2    pagesize = 4;
		int page = 2;
		int pagesize = 4;
		Connection conn = null;
		try {
			conn = DBUtil.getConnection();
			String sql = "select * from emp order by sal desc limit ?,?";
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setInt(1,(page-1)*pagesize+1);
			ps.setInt(2,page*pagesize);
			ResultSet rs = ps.executeQuery();
			while(rs.next()){
				System.out.println(rs.getString("ename")+" "+rs.getDouble("sal"));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}finally{
			DBUtil.close(conn);
		}
	}
	@Test
	public void test4(){
		EmpDao dao = new EmpDao();
		Emp e = dao.findById(7839);
//		List<Emp> list = dao.findByPage(1,3);
//		System.out.println(list);
		
//		e.setEmpno(1111);
//		e.setEname("bob");
//		dao.save(e);
		
		e.setEmpno(1111);
		e.setEname("bob");
		dao.update(e);

	}
}
