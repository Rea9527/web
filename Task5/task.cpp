
#include <iostream>
#include <string>
#include <stdlib.h>
#include <iomanip>
#include <time.h>
#include <fstream>
using namespace std;

void create_data(int last) {
	srand((unsigned)time(NULL));
	fstream fout("sort.bin", ios::binary|ios::in|ios::out);
	for(int i = 0; i < last; i++) {
		double data = rand()/double(RAND_MAX);
		cout << data << endl;
		fout.write((char*)&data, sizeof(double));
	}
	fout.close();
}

void display(fstream &src, int size) {
	src.seekg(0*sizeof(double));
	while(size--) {
		double out;
		src.read((char*)&out, sizeof(double));
		cout << fixed << setprecision(10) << out << endl;
	}
}

void merge(fstream &from, fstream &to, int left, int mid, int right) {
	int i = left;
	int j = mid+1;
	double data1, data2;
	to.seekg(i*sizeof(double));
	for(; i <= mid && j <= right; ) {
		from.seekg(i*sizeof(double));
		from.read((char*)&data1, sizeof(double));
		from.seekg(j*sizeof(double));
		from.read((char*)&data2, sizeof(double));
		if (data1 < data2) {
			to.write((char*)&data1, sizeof(double));
			i++;
		} else {
			to.write((char*)&data2, sizeof(double));
			j++;
		}
	}
	if(i <= mid) from.seekg(i*sizeof(double));
	while (i <= mid) {
		from.read((char*)&data1, sizeof(double));
		to.write((char*)&data1, sizeof(double));
		i++;
	}
	if(j <= right) from.seekg(j*sizeof(double));
	while (j <= right) {
		from.read((char*)&data2, sizeof(double));
		to.write((char*)&data2, sizeof(double));
		j++;
	}
}

void mergeSort(fstream &src, fstream &temp, int left, int right, bool inSrc) {
	double data;
	if (right == left) {
		if (!inSrc) {
			src.seekg(left*sizeof(double));
			temp.seekg(left*sizeof(double));
			src.read((char*)&data, sizeof(double));
			temp.write((char*)&data, sizeof(double));
		}
		return;
	}
	int mid = (left + right) / 2;
	mergeSort(src, temp, left, mid, !inSrc);
	mergeSort(src, temp, mid+1, right, !inSrc);
	if (inSrc)
		merge(temp, src, left, mid, right);
	else
		merge(src, temp, left, mid, right);
}

int main() {
	int l = 10000000;
	fstream src("sort.bin", ios::binary|ios::in|ios::out);
	fstream temp("temp.bin", ios::binary|ios::in|ios::out);
	mergeSort(src, temp, 0, l-1, true);
	temp.close();
	src.close();
	return 0;
}
