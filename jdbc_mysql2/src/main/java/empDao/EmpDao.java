package empDao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import jdbc_mysql.DBUtil;
import emp.Emp;

public class EmpDao {
	public void save(Emp e){
		Connection conn = null;
		try {
			conn = DBUtil.getConnection();
			String sql = "insert into emp values(?,?,?,?,?,?,?,?)";
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setInt(1,e.getEmpno());
			ps.setString(2, e.getEname());
			ps.setString(3, e.getJob());
			ps.setInt(4, e.getMgr());
			ps.setDate(5, e.getHirdate());
			ps.setDouble(6, e.getSal());
			ps.setDouble(7,e.getComm());
			ps.setInt(8, e.getDepno());
			ps.executeUpdate();
		} catch (SQLException e1) {
			e1.printStackTrace();
		}finally{
			DBUtil.close(conn);
		}
	}
	public void update(Emp e){
		Connection conn = null;
		try {
			conn = DBUtil.getConnection();
			String sql = "update emp set ename=?,job=?,mgr=?,hirdate=?,sal=?,"
					+ "comm=?,deptno=? where empno=?";
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, e.getEname());
			ps.setString(2, e.getJob());
			ps.setInt(3, e.getMgr());
			ps.setDate(4, e.getHirdate());
			ps.setDouble(5, e.getSal());
			ps.setDouble(6,e.getComm());
			ps.setInt(7, e.getDepno());
			ps.setInt(8,e.getEmpno());
			ps.executeUpdate();
		} catch (SQLException e1) {
			e1.printStackTrace();
		}finally{
			DBUtil.close(conn);
		}
	}
	public void delete(int id){
		Connection conn = null;
		try {
			conn = DBUtil.getConnection();
			String sql = "delete from emp where empno=?";
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setInt(1,id);
			ps.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		}finally{
			DBUtil.close(conn);
		}
	}
	public Emp findById(int id){
		Connection conn = null;
		try {
			conn=DBUtil.getConnection();
			String sql = "select * from emp where empno = ?";
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setInt(1,id);
			ResultSet rs = ps.executeQuery();
			if(rs.next()){
				Emp  e = new Emp();
				createEmp(rs, e);
				return e;
			}
		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}finally{
			DBUtil.close(conn);
		}
		return null;
	}
	public List<Emp> findByPage(int page,int pagesize){
		Connection conn = null;
		List<Emp> list = new ArrayList<Emp>();
		try {
			conn = DBUtil.getConnection();
			String sql = "select * from emp order by sal desc limit ?,?";
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setInt(1, (page-1)*pagesize);
			ps.setInt(2,pagesize);
			ResultSet rs = ps.executeQuery();
			while(rs.next()){
				Emp e = new Emp();
				createEmp(rs, e);
				list.add(e);
			}
			
		} catch (SQLException e) {
			e.printStackTrace();
		}finally{
			DBUtil.close(conn);
		}
		return list;
	}
	private void createEmp(ResultSet rs, Emp e) throws SQLException {
		e.setEmpno(rs.getInt("empno"));
		e.setEname(rs.getString("ename"));
		e.setJob(rs.getString("job"));
		e.setMgr(rs.getInt("mgr"));
		e.setHirdate(rs.getDate("hirdate"));
		e.setSal(rs.getDouble("sal"));
		e.setComm(rs.getDouble("comm"));
		e.setDepno(rs.getInt("deptno"));
	}

}
